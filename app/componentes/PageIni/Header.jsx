import Image from "next/image";
import Link from "next/link";
import { Cinzel } from "next/font/google";
import olhoLO from "../../assets/imagens/olhoLO.png";
import { Rotas } from "../../../lib/rotas";

const cinzel = Cinzel({ subsets: ["latin"] });

export default function Header({ type = "default" }) {
    if (type === "principal") {
    return (
            <header className="flex h-[65px] items-center justify-center gap-16 bg-[#481658] border-b border-white/10 px-5">
            <div className="flex items-center gap-10">
                <Link href="/Posts" className="text-[#F0EAE2] underline hover:text-[#A52A2A]">
                Posts
                </Link>
        
                <Link href="/Mapa" className="text-[#F0EAE2] underline hover:text-[#A52A2A]">
                Mapa
                </Link>
            </div>
            <div className="flex justify-center">
                <Link href="/Principal" className="text-[#F0EAE2] text-center underline leading-7 text-xl hover:text-[#A52A2A]">
                The Outside <br /> Guide
                </Link>
            </div>
            <div className="flex items-center gap-10">
                <Link href="/Wiki" className="text-[#F0EAE2] underline hover:text-[#A52A2A]">
                Wiki
                </Link>
            
                <Link href="/Guia" className="text-[#F0EAE2] underline hover:text-[#A52A2A]">
                Guia
                </Link>

                <Link href="/Perfil" className="bg-[#651B1B] text-[#F0EAE2] underline px-6 py-1.5 hover:bg-[#A52A2A] transition">
                    Perfil
                </Link>

            </div>
        </header>
    );
}
    return(
        <header className="flex h-16 w-full items-center justify-between border-b border-purple-900 bg-[#100D18] px-4">
            
            <div className="flex items-center gap-3">
                <Image src={olhoLO} alt="olho Look Outside" width={40} height={40} loading="eager" className="h-10 w-10 object-contain [image-rendering:pixelated]"/>
                <span className={`${cinzel.className} text-2xl font-bold text-white`}>The Outside Guide</span>
            </div>

            <div className="flex items-center justify-end gap-3 px-2">
                <Link href={Rotas.Login} className="flex h-10 items-center justify-center rounded-lg border border-red-600 bg-transparent px-5 text-white transition duration-300 hover:bg-red-600/10 hover:brightness-125">
                    Entrar
                </Link>

            <Link href={Rotas.Registro} className="flex h-10 items-center justify-center rounded-lg bg-[#A51F3B] px-5 text-white transition duration-300 hover:brightness-125">
                    Cadastrar
            </Link>
            </div>

        </header>
    );
}