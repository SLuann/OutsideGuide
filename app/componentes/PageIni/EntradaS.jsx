import Link from "next/link";
import { Play, Info } from "lucide-react";
import { Rotas } from "../../../lib/rotas";

export default function EntradaS() {
    return(
        
        <div className="flex gap-8 justify-self-center">
            <Link href="/Principal" className="flex h-11 items-center gap-2 rounded-lg bg-[#6A3FA0] px-5 text-white transition duration-300 hover:brightness-125">
                Explorar
            </Link>

            <Link href="/Creditos" className="flex h-11 items-center gap-2 rounded-lg border border-[#8B5FBF] bg-transparent px-5 text-white transition duration-300 hover:bg-[#8B5FBF]/20 hover:brightness-125">
                Sobre
            </Link>           
        </div>
    )
}