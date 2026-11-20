import Image from "next/image";
import Link from "next/link";
import { Cinzel } from "next/font/google";
import olhoLO from "../../assets/imagens/olhoLO.png";

const cinzel = Cinzel({ subsets: ["latin"] });

export default function Header({ type = "default" }) {
    if (type === "principal") {
    return (
            <header className="flex justify-center items-center gap-5 px-5">
            <div>
                <Link href="/Posts">
                Posts
                </Link>
            </div>
            <div>
                <Link href="/Mapa">
                Mapa
                </Link>
            </div>
            <div>
                <Link href="/Principal">
                The Outside Guide
                </Link>
            </div>
            <div>
                <Link href="/Wiki">
                Wiki
                </Link>
            </div>
            <div>
                <Link href="/Guia">
                Guia
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
                <Link href="/Login" className="flex h-10 items-center justify-center rounded-lg border border-red-600 bg-transparent px-5 text-white transition duration-300 hover:bg-red-600/10 hover:brightness-125">
                    Entrar
                </Link>

                <Link href="/Registro" className="flex h-10 items-center justify-center rounded-lg bg-[#A51F3B] px-5 text-white transition duration-300 hover:brightness-125">
                    Cadastrar
                </Link>
            </div>

        </header>
    );
}