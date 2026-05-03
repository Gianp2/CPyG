import { lazy, Suspense } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// Lazy load de secciones
const Hero = lazy(() => import("../components/home/Hero"));
const About = lazy(() => import("../components/home/About"));
const Animals = lazy(() => import("../components/home/Animals"));
const Donations = lazy(() => import("../components/home/Donations"));
const Contact = lazy(() => import("../components/home/Contact"));

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-white">
      <Header />

      <main>
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <span className="text-white text-lg">Cargando...</span>
            </div>
          }
        >
          <Hero />
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