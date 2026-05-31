import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async"; // Importamos Helmet
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero"; 

const About = lazy(() => import("../components/home/About"));
const Animals = lazy(() => import("../components/home/Animals"));
const Donations = lazy(() => import("../components/home/Donations"));
const Contact = lazy(() => import("../components/home/Contact"));

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-white">
      {/* Definimos el título global aquí */}
      <Helmet>
        <title>Como Perros & Gatos | Rescate y Adopción Responsable</title>
        <meta name="description" content="Encuentra a tu compañero ideal. Adoptar es salvar una vida. Conoce a nuestros animalitos rescatados." />
      </Helmet>

      <Header />

      <main id="main-content">
        <Hero />

        <Suspense fallback={<div className="h-40" />}>
          <About />
          <Animals />
          <Donations />
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}