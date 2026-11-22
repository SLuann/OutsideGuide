import { supabase } from "./supabase";

// =====================================
// BUSCAR PERFIL DO USUÁRIO AUTENTICADO
// =====================================
export async function buscarPerfil() {
    const { data: { user }, error: erroAuth } = await supabase.auth.getUser();

    if (erroAuth) throw erroAuth;
    if (!user) throw new Error("Usuário não autenticado.");

    const { data: perfil, error } = await supabase
        .from("Perfis")
        .select("id_user, nome_user, biografia_user, avatar_user")
        .eq("id_user", user.id)
        .single();

    if (error) throw error;

    return {
        id: user.id,
        email: user.email,
        dataCriacao: user.created_at,
        nome: perfil.nome_user,
        biografia: perfil.biografia_user,
        avatar: perfil.avatar_user,
    };
}

// =====================================
// ATUALIZAR NOME E BIOGRAFIA
// =====================================
export async function atualizarPerfil({ nome, biografia }) {
    const { data: { user }, error: erroAuth } = await supabase.auth.getUser();

    if (erroAuth) throw erroAuth;
    if (!user) throw new Error("Usuário não autenticado.");

    const { data, error } = await supabase
        .from("Perfis")
        .update({
            nome_user: nome.trim(),
            biografia_user: biografia.trim(),
        })
        .eq("id_user", user.id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

// =====================================
// ALTERAR EMAIL
// =====================================
export async function alterarEmail(novoEmail) {
    const { data, error } = await supabase.auth.updateUser({
        email: novoEmail.trim(),
    });

    if (error) throw error;

    return data;
}

// =====================================
// UPLOAD E ATUALIZAÇÃO DO AVATAR
// =====================================
export async function uploadAvatar(arquivo) {
    // Verificar usuário autenticado
    const { data: { user }, error: erroAuth } =
        await supabase.auth.getUser();

    if (erroAuth) throw erroAuth;
    if (!user) throw new Error("Usuário não autenticado.");

    // Verificar se existe arquivo
    if (!arquivo) {
        throw new Error("Nenhuma imagem foi selecionada.");
    }

    // Tipos de imagem permitidos
    const tiposPermitidos = [
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    if (!tiposPermitidos.includes(arquivo.type)) {
        throw new Error("Utilize uma imagem JPG, PNG ou WEBP.");
    }

    // Limite de 2 MB
    const limite = 2 * 1024 * 1024;

    if (arquivo.size > limite) {
        throw new Error("A imagem deve possuir no máximo 2 MB.");
    }

    // Buscar avatar anterior
    const { data: perfilAtual, error: erroBusca } = await supabase
        .from("Perfis")
        .select("avatar_user")
        .eq("id_user", user.id)
        .single();

    if (erroBusca) throw erroBusca;

    // Gerar nome único para evitar cache da imagem anterior
    const extensoes = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
    };

    const extensao = extensoes[arquivo.type];
    const caminho = `${user.id}/avatar-${Date.now()}.${extensao}`;

    // Enviar imagem
    const { error: erroUpload } = await supabase.storage
        .from("avatars")
        .upload(caminho, arquivo, {
            contentType: arquivo.type,
            upsert: false,
        });

    if (erroUpload) throw erroUpload;

    // Obter URL pública
    const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(caminho);

    const urlAvatar = urlData.publicUrl;

    // Atualizar avatar no perfil
    const { error: erroAtualizacao } = await supabase
        .from("Perfis")
        .update({
            avatar_user: urlAvatar,
        })
        .eq("id_user", user.id);

    // Se falhar ao atualizar o perfil, apagar o arquivo novo
    if (erroAtualizacao) {
        await supabase.storage.from("avatars").remove([caminho]);
        throw erroAtualizacao;
    }

    // Apagar avatar anterior se estiver armazenado no bucket avatars
    const avatarAnterior = perfilAtual?.avatar_user;

    if (avatarAnterior) {
        const marcador = "/storage/v1/object/public/avatars/";

        if (avatarAnterior.includes(marcador)) {
            const caminhoAnterior = decodeURIComponent(
                avatarAnterior.split(marcador)[1].split("?")[0]
            );

            if (caminhoAnterior && caminhoAnterior !== caminho) {
                await supabase.storage
                    .from("avatars")
                    .remove([caminhoAnterior]);
            }
        }
    }

    return urlAvatar;
}

// =====================================
// REMOVER AVATAR E RESTAURAR PADRÃO
// =====================================
export async function removerAvatar() {
    // Verificar usuário autenticado
    const { data: { user }, error: erroAuth } =
        await supabase.auth.getUser();

    if (erroAuth) throw erroAuth;
    if (!user) throw new Error("Usuário não autenticado.");

    // Buscar avatar atual
    const { data: perfil, error: erroBusca } = await supabase
        .from("Perfis")
        .select("avatar_user")
        .eq("id_user", user.id)
        .single();

    if (erroBusca) throw erroBusca;

    const avatarAtual = perfil?.avatar_user;

    // Restaurar o padrão no perfil
    const { error: erroAtualizacao } = await supabase
        .from("Perfis")
        .update({
            avatar_user: null,
        })
        .eq("id_user", user.id);

    if (erroAtualizacao) throw erroAtualizacao;

    // Se havia avatar armazenado no bucket, remover o arquivo
    if (avatarAtual) {
        const marcador = "/storage/v1/object/public/avatars/";

        if (avatarAtual.includes(marcador)) {
            const caminho = decodeURIComponent(
                avatarAtual.split(marcador)[1].split("?")[0]
            );

            if (caminho.startsWith(`${user.id}/`)) {
                const { error: erroRemocao } = await supabase.storage
                    .from("avatars")
                    .remove([caminho]);

                if (erroRemocao) throw erroRemocao;
            }
        }
    }

    return true;
}