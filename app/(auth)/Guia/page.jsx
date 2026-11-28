import Header from "../../componentes/PageIni/Header";
import PainelObjetivos from "../../componentes/GuiaC/PainelObjetivos";

export default function Guia() {
    return (
        <div className="min-h-screen bg-[#2b2b2b]">
            <Header type="principal" />
            <main className="py-10 overflow-x-auto">
                <PainelObjetivos />
            </main>
        </div>
    );
}