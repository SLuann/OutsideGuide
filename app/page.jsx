import Header from "./componentes/PageIni/Header";
import Footer from "./componentes/PageIni/Footer";
import SessoesI from "./componentes/PageIni/SessoesI";
import Hero from "./componentes/PageIni/Hero";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 text-white">
                <Hero />
                <SessoesI />
            </main>

            <Footer />
        </div>
    );
}