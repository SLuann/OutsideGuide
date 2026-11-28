"use client";

const estilos = {
  cumprido: "border-green-500 bg-[#1f2e1f] shadow-[0_0_8px_#22c55e80]",
  disponivel: "border-gray-300 bg-[#3a3a3a] hover:brightness-125 cursor-pointer",
  bloqueado: "border-gray-700 bg-[#1a1a1a] opacity-50 grayscale cursor-not-allowed",
};

const estilosMarco = {
  cumprido: "border-yellow-400 bg-[#3a3114] shadow-[0_0_10px_#facc1590]",
  disponivel: "border-yellow-700 bg-[#2a2410] cursor-default",
  bloqueado: "border-yellow-900 bg-[#1a1a1a] opacity-60 cursor-default",
};

export default function NoObjetivo({ objetivo, status, onClick }) {
  const clicavel = status !== "bloqueado";

  return (
    <button
      type="button"
      title={`${objetivo.nome}\n${objetivo.descricao}`}
      onClick={() => clicavel && onClick?.(objetivo)}
      className={`w-14 h-14 border-4 flex items-center justify-center transition ${objetivo.marco ? estilosMarco[status] : estilos[status]}`}
    >
      {objetivo.icone ? (
        <img src={objetivo.icone} alt={objetivo.nome} className="w-8 h-8 [image-rendering:pixelated]" />
      ) : (
        <span className="text-white text-xl">{objetivo.rotulo ?? objetivo.nome.charAt(0)}</span>
      )}
    </button>
  );
}