"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buscarPerfil } from "../../../lib/perfil";
import { Rotas } from "../../../lib/rotas";

import Header from "../../componentes/PageIni/Header";
import PerfilF from "../../assets/imagens/PerfilF.jpg";
import InfoUser from "../../componentes/PerfilC/InfoUser";
import Conquistas from "../../componentes/PerfilC/Conquistas";
import Link from "next/link";
import Image from "next/image";

export default function Wiki() {
    const router = useRouter();

    const [perfil, setPerfil] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregarDados() {
            try {
                const dados = await buscarPerfil();

                setPerfil(dados);
            } catch (error) {
                console.error("Erro ao carregar perfil:", error);

                if (error.message === "Usuário não autenticado.") {
                    router.replace("/Login");
                } else {
                    setErro("Não foi possível carregar seu perfil.");
                }
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, [router]);

    if (carregando) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Carregando perfil...</p>
            </main>
        );
    }

    if (erro) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>{erro}</p>
            </main>
        );
    }
    return (
        <div>
            <Header type="principal" />
            <main className="gap-8 relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden">
                <Image
                    src={PerfilF}
                    alt=""
                    fill
                    priority
                    className="bg-center bg-no-repeat bg-cover [image-rendering:pixelated]"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="flex flex-col z-10 text-center">
                    <div className="absolute top-4 left-4">
                        <Link href={Rotas.Principal}
                            className="m-3 text-sm text-[#77716B] font-medium hover:text-[#A52A2A] hover:underline">
                            ← Voltar à Página Principal</Link>
                    </div>

                    <div className="flex relative justify-center items-center">
                        <div className="w-[100px] h-[100px] border border-[#651B1B] rounded-full overflow-hidden">
                            <img src={perfil?.avatar || "https://www.bogleech.com/games/lookoutside/crimsonbloom.png"}
                                alt="Icone com imagem do perfil"
                                className="w-full h-full object-cover object-center" />
                        </div>
                        <button
                            type="button"
                            className="absolute bottom-1 right-1 bg-red-700 hover:bg-red-600
                            text-white w-9 h-9 rounded-full flex items-center justify-center
                            border-2 border-black transition-all hover:scale-110" >
                            📷
                        </button>
                    </div>
                </div>
                <div className="w-[800px] h-[2px] bg-[#481658] z-10 rounded-full" />
                <InfoUser
                    perfil={perfil}
                    onPerfilAtualizado={(dados) =>
                        setPerfil((prev) => ({ ...prev, ...dados }))
                    }
                />
                <Conquistas />
            </main>
        </div>
    );
}