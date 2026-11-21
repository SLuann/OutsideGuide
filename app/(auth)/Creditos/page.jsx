import Link from "next/link";

const projeto = {
    nome: "The Outside Guide",
    descricao:
        "The Outside Guide é um site guia para o jogo Look Outside. Ele reúne wiki, mapa, posts e guia em um só lugar, para ajudar os jogadores a entenderem e sobreviverem ao desconhecido.",
    objetivo:
        "O objetivo do projeto é facilitar a consulta de informações do jogo e organizar o conteúdo de forma clara. Ele foi desenvolvido como projeto de conclusão de matéria, aplicando o que aprendemos de Next.js, React e Tailwind.",
};

const desenvolvedores = [
    {
        nome: "Jade Raquel",
        github: "https://github.com/SEU-USUARIO",
        funcao: "ESCREVA AQUI a função no projeto",
        bio: "ESCREVA AQUI a biografia.",
        experiencia: "ESCREVA AQUI a experiência pessoal no desenvolvimento.",
    },
    {
        nome: "Shallyson Luann",
        github: "https://github.com/SEU-USUARIO",
        funcao: "ESCREVA AQUI a função no projeto",
        bio: "ESCREVA AQUI a biografia.",
        experiencia: "ESCREVA AQUI a experiência pessoal no desenvolvimento.",
    },
    {
        nome: "Talita Kauanne",
        github: "https://github.com/SEU-USUARIO",
        funcao: "ESCREVA AQUI a função no projeto",
        bio: "ESCREVA AQUI a biografia.",
        experiencia: "ESCREVA AQUI a experiência pessoal no desenvolvimento.",
    },
    {
        nome: "Vinícius Miguel",
        github: "https://github.com/SEU-USUARIO",
        funcao: "ESCREVA AQUI a função no projeto",
        bio: "ESCREVA AQUI a biografia.",
        experiencia: "ESCREVA AQUI a experiência pessoal no desenvolvimento.",
    },
];

const professores = [
    { nome: "Daniel Aguiar", cargo: "Orientador", bio: "ESCREVA AQUI a biografia." },
    { nome: "Henrique Coelho", cargo: "Coorientador", bio: "ESCREVA AQUI a biografia." },
];

// Título de seção reutilizável: linha + losango + texto
function TituloSecao({ children }) {
    return (
        <div className="flex items-center gap-4 w-full max-w-5xl">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-700" />
            <h2 className="font-serif text-2xl md:text-3xl tracking-[0.2em] uppercase text-white text-center">
                {children}
            </h2>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-700" />
        </div>
    );
}

// Classes compartilhadas pelos cards
const cardClasses =
    "group relative overflow-hidden rounded-xl border border-purple-900/60 bg-[#171221]/80 p-6 backdrop-blur " +
    "transition duration-300 hover:-translate-y-1 hover:border-[#A51F3B] " +
    "hover:shadow-[0_0_30px_rgba(165,31,59,0.35)]";

export default function Creditos() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#100D18] text-gray-300">
            {/* Animações (dentro do próprio arquivo) */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.35; }
                    50%      { opacity: 0.65; }
                }
                .fade-up { opacity: 0; animation: fadeUp 0.7s ease forwards; }
                .glow    { animation: pulseGlow 6s ease-in-out infinite; }
            `}</style>

            {/* Brilhos de fundo */}
            <div className="glow pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-700/30 blur-[120px]" />
            <div className="glow pointer-events-none absolute top-[40%] -right-40 h-[400px] w-[400px] rounded-full bg-[#A51F3B]/20 blur-[120px]" />

            <div className="relative z-10 flex flex-col items-center gap-16 px-6 py-16 md:px-10">

                {/* HERO */}
                <header className="fade-up flex flex-col items-center text-center">
                    <span className="mb-4 rounded-full border border-purple-800 px-4 py-1 text-xs tracking-[0.35em] text-purple-300">
                        QUEM CONSTRUIU O DESCONHECIDO
                    </span>
                    <h1 className="bg-gradient-to-b from-white to-purple-300 bg-clip-text font-serif text-5xl font-bold uppercase tracking-widest text-transparent md:text-7xl">
                        Créditos
                    </h1>
                    <div className="mt-6 h-1 w-24 rounded bg-[#A51F3B] shadow-[0_0_15px_#A51F3B]" />
                </header>

                {/* PROJETO */}
                <section
                    className="fade-up flex w-full max-w-4xl flex-col items-center gap-6"
                    style={{ animationDelay: "0.15s" }}
                >
                    <TituloSecao>Sobre o projeto</TituloSecao>

                    <div className="relative rounded-xl border border-purple-900/60 bg-[#171221]/80 p-8 text-center backdrop-blur">
                        <span className="absolute left-0 top-0 h-6 w-6 rounded-tl-xl border-l-2 border-t-2 border-[#A51F3B]" />
                        <span className="absolute bottom-0 right-0 h-6 w-6 rounded-br-xl border-b-2 border-r-2 border-[#A51F3B]" />

                        <h3 className="font-serif text-xl text-white">{projeto.nome}</h3>
                        <p className="mt-3 leading-relaxed">{projeto.descricao}</p>

                        <h3 className="mt-8 font-serif text-xl text-[#d63a5a]">
                            Objetivo
                        </h3>
                        <p className="mt-3 leading-relaxed">{projeto.objetivo}</p>
                    </div>
                </section>

                {/* DESENVOLVEDORES */}
                <section className="flex w-full flex-col items-center gap-8">
                    <TituloSecao>Desenvolvedores</TituloSecao>

                    <div className="grid w-full max-w-5xl gap-6 md:grid-cols-2">
                        {desenvolvedores.map((dev, i) => (
                            <article
                                key={dev.nome}
                                className={`fade-up ${cardClasses}`}
                                style={{ animationDelay: `${0.1 * i}s` }}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Avatar com a inicial */}
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-purple-700 bg-gradient-to-br from-purple-900 to-[#A51F3B] font-serif text-2xl text-white transition group-hover:scale-110">
                                        {dev.nome.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl text-white">{dev.nome}</h3>
                                        <p className="text-sm text-purple-300">{dev.funcao}</p>
                                    </div>
                                </div>

                                <p className="mt-5 leading-relaxed">{dev.bio}</p>

                                <div className="mt-4 rounded-lg border-l-2 border-[#A51F3B] bg-black/20 p-3 text-sm">
                                    <span className="font-semibold text-purple-300">Experiência: </span>
                                    {dev.experiencia}
                                </div>

                                <a
                                    href={dev.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex items-center gap-2 rounded-md border border-[#A51F3B] px-4 py-2 text-sm text-white transition hover:bg-[#A51F3B] hover:shadow-[0_0_15px_#A51F3B]"
                                >
                                    GitHub <span aria-hidden>→</span>
                                </a>
                            </article>
                        ))}
                    </div>
                </section>

                {/* ORIENTAÇÃO */}
                <section className="flex w-full flex-col items-center gap-8">
                    <TituloSecao>Orientação</TituloSecao>

                    <div className="grid w-full max-w-5xl gap-6 md:grid-cols-2">
                        {professores.map((prof, i) => (
                            <article
                                key={prof.nome}
                                className={`fade-up ${cardClasses}`}
                                style={{ animationDelay: `${0.1 * i}s` }}
                            >
                                <p className="text-xs uppercase tracking-[0.3em] text-[#d63a5a]">
                                    {prof.cargo}
                                </p>
                                <h3 className="mt-1 font-serif text-xl text-white">{prof.nome}</h3>
                                <p className="mt-3 leading-relaxed">{prof.bio}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* VOLTAR */}
                <Link
                    href="/"
                    className="rounded-md border border-purple-700 px-8 py-3 font-serif tracking-widest text-white transition hover:border-[#A51F3B] hover:bg-[#A51F3B]/20 hover:shadow-[0_0_20px_rgba(165,31,59,0.5)]"
                >
                    ← Voltar ao início
                </Link>
            </div>
        </main>
    );
}