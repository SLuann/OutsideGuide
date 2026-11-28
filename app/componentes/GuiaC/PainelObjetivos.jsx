"use client";

import { useState } from "react";
import { montarArvore } from "../../../lib/objetivos";
import NoObjetivo from "./NoObjetivo";
import Conexoes from "./Conexoes";

const CELULA = 80;
const TAMANHO_NO = 56;
const MARGEM = (CELULA - TAMANHO_NO) / 2;

const { nos, faixas } = montarArvore();

function calcularStatus(no, concluidos) {
  if (concluidos.includes(no.id)) return "cumprido";
  const requisitosOk = no.requer.every((id) => concluidos.includes(id));
  return requisitosOk ? "disponivel" : "bloqueado";
}

export default function PainelObjetivos() {
  const [cumpridos, setCumpridos] = useState([]);

  const marcosConcluidos = nos
    .filter((n) => n.marco && n.requer.every((id) => cumpridos.includes(id)))
    .map((n) => n.id);
  const concluidos = [...cumpridos, ...marcosConcluidos];

  const maxX = nos.reduce((m, n) => Math.max(m, n.x), 0);
  const maxY = nos.reduce((m, n) => Math.max(m, n.y), 0);
  const largura = (Math.ceil(maxX) + 1) * CELULA;
  const altura = (Math.ceil(maxY) + 1) * CELULA;

  function marcar(objetivo) {
    setCumpridos((anteriores) =>
      anteriores.includes(objetivo.id) ? anteriores : [...anteriores, objetivo.id]
    );
  }

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