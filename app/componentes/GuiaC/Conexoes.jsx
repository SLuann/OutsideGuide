export default function Conexoes({ objetivos, cumpridos, largura, altura, celula, tamanhoNo }) {
  const raio = tamanhoNo / 2;

  function centro(obj) {
    return { x: obj.x * celula + celula / 2, y: obj.y * celula + celula / 2 };
  }

  function desenharCaminho(origem, destino) {
    const a = centro(origem);
    const b = centro(destino);

    if (destino.y === origem.y) {
      const dir = destino.x > origem.x ? 1 : -1;
      return `M ${a.x + dir * raio} ${a.y} H ${b.x - dir * raio}`;
    }

    const dir = destino.y > origem.y ? 1 : -1;
    const inicioY = a.y + dir * raio;
    const fimY = b.y - dir * raio;

    if (destino.x === origem.x) {
      return `M ${a.x} ${inicioY} V ${fimY}`;
    }

    const meioY = (inicioY + fimY) / 2;
    return `M ${a.x} ${inicioY} V ${meioY} H ${b.x} V ${fimY}`;
  }

  const linhas = [];
  objetivos.forEach((destino) => {
    destino.requer.forEach((idOrigem) => {
      const origem = objetivos.find((o) => o.id === idOrigem);
      if (!origem) return;
      linhas.push({
        chave: `${idOrigem}-${destino.id}`,
        caminho: desenharCaminho(origem, destino),
        ativa: cumpridos.includes(idOrigem),
      });
    });
  });

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={largura}
      height={altura}
      shapeRendering="crispEdges"
    >
      <defs>
        <marker id="seta-verde" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0 0 L8 4 L0 8 Z" fill="#22c55e" />
        </marker>
        <marker id="seta-cinza" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0 0 L8 4 L0 8 Z" fill="#6b7280" />
        </marker>
      </defs>

      {linhas.map((l) => (
        <path
          key={l.chave}
          d={l.caminho}
          fill="none"
          strokeWidth="3"
          stroke={l.ativa ? "#22c55e" : "#6b7280"}
          markerEnd={`url(#${l.ativa ? "seta-verde" : "seta-cinza"})`}
        />
      ))}
    </svg>
  );
}