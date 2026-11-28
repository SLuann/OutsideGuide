"use client";

import { useState } from "react";
import {sendRecoveryCode, verifyRecoveryCode, updateRecoveryPassword} from "../../lib/recovery";

export default function PainelRecpSenha({ open, onClose }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendCode() {
    setLoading(true);
    setMessage("");

    try {
      await sendRecoveryCode(email);
      setStep("code");
      setMessage("Código enviado para seu e-mail!");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode() {
    setLoading(true);
    setMessage("");

    try {
      await verifyRecoveryCode(email, code);
      setModalOpen(true);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword() {
    setMessage("");

    if (password.length < 8) {
      setMessage("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      await updateRecoveryPassword(password);
      setMessage("Senha atualizada com sucesso!");
      setModalOpen(false);
      onClose();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!open && !modalOpen) return null;

  return (
  <div className="relative mx-auto" style={{ width: largura, height: altura }}>
    <Conexoes
      objetivos={nos}
      cumpridos={concluidos}
      largura={largura}
      altura={altura}
      celula={CELULA}
      tamanhoNo={TAMANHO_NO}
    />

    {faixas.map((f) => (
      <div
        key={f.numero}
        className="absolute text-sm text-gray-300"
        style={{ left: MARGEM, top: f.y * CELULA + MARGEM }}
      >
        {f.titulo}
      </div>
    ))}

    {nos.map((no) => {
      const status = calcularStatus(no, concluidos);
      return (
        <div
          key={no.id}
          className="absolute flex items-center gap-2"
          style={{
            left: no.x * CELULA + MARGEM,
            top: no.y * CELULA + MARGEM,
          }}
        >
          <NoObjetivo
            objetivo={no}
            status={status}
            onClick={no.marco ? undefined : marcar}
          />
          {no.marco && (
            <span
              className={`text-sm whitespace-nowrap ${
                status === "cumprido" ? "text-yellow-400" : "text-gray-500"
              }`}
            >
              Concluído
            </span>
          )}
        </div>
      );
    })}
  </div>
);
}