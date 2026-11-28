"use client";

import { diaLiberado } from "../../../lib/objetivos";

export default function AbasDias({ dias, diaAtual, cumpridos, onSelecionar }) {
  return (
    <div className="flex flex-wrap gap-1 px-2 pb-2">
      {dias.map((dia) => {
        const liberado = diaLiberado(dia.numero, cumpridos);
        const ativo = dia.numero === diaAtual;

        return (
          <button
            key={dia.numero}
            type="button"
            disabled={!liberado}
            onClick={() => onSelecionar(dia.numero)}
            className={`px-3 py-1 border-4 text-sm transition ${
              ativo
                ? "border-white bg-[#8b8b8b] text-white"
                : liberado
                ? "border-gray-500 bg-[#6b6b6b] text-gray-200 hover:brightness-125"
                : "border-gray-700 bg-[#2a2a2a] text-gray-500 cursor-not-allowed"
            }`}
          >
            {liberado ? dia.titulo : `🔒 ${dia.titulo}`}
          </button>
        );
      })}
    </div>
  );
}