"use client";

import { useState } from "react";
import { atualizarPerfil } from "../../../lib/perfil";

export default function InfoUser({ perfil, onPerfilAtualizado }) {
    // Estados do nome
    const [editandoNome, setEditandoNome] = useState(false);
    const [nomeEditado, setNomeEditado] = useState(perfil?.nome || "");
    const [salvandoNome, setSalvandoNome] = useState(false);
    const [erroNome, setErroNome] = useState("");

    // Estados da biografia
    const [editandoBio, setEditandoBio] = useState(false);
    const [bioEditada, setBioEditada] = useState(perfil?.biografia || "");
    const [salvandoBio, setSalvandoBio] = useState(false);
    const [erroBio, setErroBio] = useState("");

    // ========================================
    // NOME DE USUÁRIO
    // ========================================

    async function salvarNome() {
        if (salvandoNome) return;

        const nome = nomeEditado.trim();

        if (!nome) {
            setErroNome("O nome de usuário não pode ficar vazio.");
            return;
        }

        if (nome === perfil?.nome) {
            setEditandoNome(false);
            setErroNome("");
            return;
        }

        setSalvandoNome(true);
        setErroNome("");

        try {
            await atualizarPerfil({
                nome,
                biografia: perfil?.biografia || "",
            });

            onPerfilAtualizado?.({ nome });

            setEditandoNome(false);
        } catch (error) {
            console.error("Erro ao atualizar nome:", error);
            setErroNome("Não foi possível salvar o nome de usuário.");
        } finally {
            setSalvandoNome(false);
        }
    }

    function cancelarNome() {
        if (salvandoNome) return;

        setNomeEditado(perfil?.nome || "");
        setEditandoNome(false);
        setErroNome("");
    }

    // ========================================
    // BIOGRAFIA
    // ========================================

    async function salvarBio() {
        if (salvandoBio) return;

        const biografia = bioEditada.trim();

        if (biografia === (perfil?.biografia || "")) {
            setEditandoBio(false);
            setErroBio("");
            return;
        }

        setSalvandoBio(true);
        setErroBio("");

        try {
            await atualizarPerfil({
                nome: perfil?.nome || "",
                biografia,
            });

            onPerfilAtualizado?.({ biografia });

            setEditandoBio(false);
        } catch (error) {
            console.error("Erro ao atualizar biografia:", error);
            setErroBio("Não foi possível salvar a biografia.");
        } finally {
            setSalvandoBio(false);
        }
    }

    function cancelarBio() {
        if (salvandoBio) return;

        setBioEditada(perfil?.biografia || "");
        setEditandoBio(false);
        setErroBio("");
    }

    return (
        <section className="bg-[#111111] border border-[#481658] text-[#F0EAE2] shadow-lg shadow-[#481658] 
        z-10 rounded-lg w-[500px] md:w-[1200px] px-3">
            <h1 className="text-2xl font-bold">Informações Pessoais</h1>
            <div className="p-3">
                <h2>Nome de usuário:</h2>

                {editandoNome ? (
                    <div>
                        <input
                            type="text"
                            value={nomeEditado}
                            onChange={(e) => {
                                setNomeEditado(e.target.value);
                                setErro("");
                            }}
                            onBlur={cancelarEdicao}
                            disabled={salvando}
                            autoFocus
                        />

                        <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={salvarNome}
                            disabled={salvando}
                        >
                            {salvando ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                ) : (
                    <p
                        onClick={() => {
                            setNomeEditado(perfil?.nome || "");
                            setEditandoNome(true);
                        }}
                    >
                        {perfil?.nome}
                    </p>
                )}

                {erroNome && <p>{erroNome}</p>}
            </div>
            <div className="p-3">
                <h2>Email Registrado:</h2>
                <p>{perfil?.email}</p>
            </div>
            <div className="p-3">
                <h2>Biografia:</h2>
                {editandoBio ? (
                    <div>
                        <textarea
                            value={bioEditada}
                            onChange={(e) => {
                                setBioEditada(e.target.value);
                                setErroBio("");
                            }}
                            onBlur={cancelarBio}
                            disabled={salvandoBio}
                            autoFocus
                        />

                        <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={salvarBio}
                            disabled={salvandoBio}
                        >
                            {salvandoBio ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                ) : (
                    <p
                        onClick={() => {
                            setBioEditada(perfil?.biografia || "");
                            setEditandoBio(true);
                        }}
                    >
                        {perfil?.biografia || "Nada foi escrito aqui."}
                    </p>
                )}

                {erroBio && <p>{erroBio}</p>}
            </div>
            <div className="p-3">
                <p>
                    Data de criação dessa conta:
                    Criado em{" "}
                    {perfil?.dataCriacao
                        ? new Date(perfil.dataCriacao).toLocaleDateString("pt-BR")
                        : "—"}
                </p>
            </div>
        </section>
    );
}