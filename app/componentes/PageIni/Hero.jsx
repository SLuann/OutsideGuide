import Image from "next/image";
import fundo from "../../assets/imagens/FundoLOmain.png";
import { Cinzel } from "next/font/google";
import EntradaS from "./EntradaS";

const cinzel = Cinzel({ subsets: ["latin"] });

export default function Hero() {
    return (
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
            <Image
                src={fundo}
                alt=""
                fill
                priority
                className="object-cover [image-rendering:pixelated]"
            />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,13,24,0.85)_0%,rgba(16,13,24,0.3)_100%)]" />
        
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#100D18]" />

            <div className="relative z-10 max-w-2xl px-6 py-16 text-center md:px-16">

            <h1 className={`${cinzel.className}mt-6 text-6xl font-bold leading-tight md:text-7xl`}>
                <span className="text-white">THE OUTSIDE</span>{" "} <span className="text-red-800">GUIDE</span>
            </h1>

            <p className={`${cinzel.className} mt-6 text-2xl text-purple-100`}>
                Lá fora, nada é o que parece.
            </p>

            <p className="mt-4 text-base text-purple-300">
                Descubra criaturas, explore lugares e desvende os mistérios que cercam o mundo de Look Outside.
            </p>

            <div className="mt-8 flex justify-center">
                <EntradaS />
            </div>
        </div>
        </section>
        );
    }