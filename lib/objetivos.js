export const dias = [
  {
  numero: 1,
  titulo: "Dia 1",
  saidas: ["d1-b"],
  objetivos: [
    { id: "d1-b", nome: "Objetivo B", descricao: "Em breve", icone: null, x: 1, y: 0, requer: [] },
    { id: "d1-a", nome: "Objetivo A", descricao: "Em breve", icone: null, x: 0, y: 0, requer: ["d1-b"] },
    { id: "d1-c", nome: "Objetivo C", descricao: "Em breve", icone: null, x: 2, y: 0, requer: ["d1-b"] },
  ],
},
{
  numero: 2,
  titulo: "Dia 2",
  saidas: ["d2-b"],
  objetivos: [
    { id: "d2-b", nome: "Objetivo B", descricao: "Em breve", icone: null, x: 1, y: 0, requer: [] },
    { id: "d2-a", nome: "Objetivo A", descricao: "Em breve", icone: null, x: 0, y: 0, requer: ["d2-b"] },
    { id: "d2-c", nome: "Objetivo C", descricao: "Em breve", icone: null, x: 2, y: 0, requer: ["d2-b"] },
  ],
},
];

export function diaCompleto(dia, cumpridos) {
  return dia.objetivos.every((obj) => cumpridos.includes(obj.id));
}

export function diaLiberado(numeroDia, cumpridos) {
  if (numeroDia === 1) return true;

  const diaAnterior = dias.find((d) => d.numero === numeroDia - 1);
  if (!diaAnterior) return false;

  return diaCompleto(diaAnterior, cumpridos);
}

const ESPACO_ROTULO = 0.75;
const ESPACO_MARCO = 1.5;

export function montarArvore() {
  const diasComConteudo = dias.filter((d) => d.objetivos.length > 0);
  const nos = [];
  const faixas = [];
  let yInicio = 0;
  let idMarcoAnterior = null;

  diasComConteudo.forEach((dia) => {
    const maxX = dia.objetivos.reduce((m, o) => Math.max(m, o.x), 0);
    const maxY = dia.objetivos.reduce((m, o) => Math.max(m, o.y), 0);
    const yObjetivos = yInicio + ESPACO_ROTULO;

    dia.objetivos.forEach((obj) => {
      nos.push({
        ...obj,
        y: yObjetivos + obj.y,
        requer:
          obj.requer.length === 0 && idMarcoAnterior
            ? [idMarcoAnterior]
            : obj.requer,
      });
    });

    const idsUsados = new Set(dia.objetivos.flatMap((o) => o.requer));
    const saidas =
      dia.saidas ??
      dia.objetivos.filter((o) => !idsUsados.has(o.id)).map((o) => o.id);

    const idMarco = `marco-${dia.numero}`;
    const yMarco = yObjetivos + maxY + ESPACO_MARCO;

    nos.push({
      id: idMarco,
      nome: `${dia.titulo} concluído`,
      descricao: "Complete os objetivos para avançar",
      icone: null,
      rotulo: "★",
      marco: true,
      x: maxX / 2,
      y: yMarco,
      requer: saidas,
    });

    faixas.push({ numero: dia.numero, titulo: dia.titulo, y: yInicio });

    yInicio = yMarco + 1;
    idMarcoAnterior = idMarco;
  });

  return { nos, faixas };
}