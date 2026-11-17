import Link from "next/link";
import { Cinzel } from "next/font/google";
import Image from "next/image";
import IWLO from "../../imagens/IWLO.png";
import IMLO from "../../imagens/IMLO.png";
import IPLO from "../../imagens/IPLO.png";
import IGLO from "../../imagens/IGLO.png";

const cinzel = Cinzel({ subsets: ["latin"] });

const cards = [
    {
        numero: "01 / WIKI",
        titulo: "Wiki",
        texto: "Conheça as entidades, personagens e itens do universo de Look Outside.",
        imagem: IWLO,
        alt: "Imagem que simboliza a wiki",
        href: "/wiki",
    },
    {
        numero: "02 / MAPA",
        titulo: "Mapa",
        texto: "Explore os ambientes e descubra novos caminhos.",
        imagem: IMLO,
        alt: "Imagem que simboliza o mapa",
        href: "/mapa",
    },
    {
        numero: "03 / POSTS",
        titulo: "Posts",
        texto: "Leia teorias, curiosidades e compartilhe suas ideias.",
        imagem: IPLO,
        alt: "Imagem que simboliza os posts",
        href: "/posts",
    },
    {
        numero: "04 / GUIA",
        titulo: "Guia",
        texto: "Encontre dicas e orientações para sobreviver.",
        imagem: IGLO,
        alt: "Imagem que simboliza o guia",
        href: "/guia",
    },
];

export default function SessoesI() {
    return (
        <div className="bg-gradient-to-b from-[#100D18] to-[#2A1650]">
            <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-2">

                {/* Cabeçalho da seção */}
                <div className="mb-10">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-1 bg-[#A51F3B]" />

                        <div>
                            <h2 className={`${cinzel.className} text-3xl font-bold text-purple-100`}>
                                EXPLORE O DESCONHECIDO
                            </h2>
                            <p className="mt-1 text-purple-300">
                                Tudo o que você precisa saber está aqui.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 h-px w-full bg-purple-900" />
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => (
                        <article
                            key={card.href}
                            className="flex h-full flex-col overflow-hidden rounded-xl border border-purple-900 bg-[#100D18]"
                        >
                            <div className="relative h-64">
                                <Image
                                    src={card.imagem}
                                    alt={card.alt}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover [image-rendering:pixelated]"
                                />
                                <span className="absolute right-3 top-3 rounded bg-black/60 px-2 py-1 text-xs tracking-widest text-purple-200">
                                    {card.numero}
                                </span>
                            </div>

                            <div className="flex flex-1 flex-col gap-3 p-5">
                                <h3 className={`${cinzel.className} text-2xl font-semibold text-white`}>
                                    {card.titulo}
                                </h3>

                                <p className="text-sm text-purple-300">{card.texto}</p>

                                <Link
                                    href={card.href}
                                    className="mt-auto pt-2 text-sm font-semibold text-red-500 hover:text-red-400"
                                >
                                    Acessar →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

            </section>
        </div>
    );
}