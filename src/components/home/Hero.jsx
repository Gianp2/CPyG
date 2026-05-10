import { ArrowDown, HeartPulse } from "lucide-react";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section
      id="inicio"
      /* Aumentamos pt-16 a pt-32 para escritorio y pt-24 para móviles */
      className="relative min-h-screen flex items-center pt-32 md:pt-40 pb-16 bg-brand-bg overflow-hidden"
    >
      {/* Fondo decorativo - Ajustado para que no tape contenido */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-brand-light opacity-10 rounded-l-full -z-10 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* TEXTO */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Badge superior opcional para dar contexto antes del título */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/20 rounded-full text-brand-primary-dark text-xs font-bold uppercase tracking-widest mb-6">
            <HeartPulse className="w-4 h-4" />
            <span>Protectora Animal Armstrong</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-brand-dark leading-[1.1] mb-6">
            Cambiando vidas,
            <br />
            <span className="italic text-brand-secondary-dark relative">
              una pata a la vez.
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-brand-secondary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 0 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
            Rescatamos, rehabilitamos y buscamos hogares responsables para cada
            animal de nuestra ciudad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              onClick={() =>
                document.getElementById("animals")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              aria-label="Ver animales disponibles para adopción"
              className="bg-brand-secondary hover:bg-brand-primary text-white py-4 px-8 flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-primary/20 rounded-2xl font-bold"
            >
              Conocer animales
              <ArrowDown className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* IMAGEN */}
        <div className="lg:col-span-5 relative mt-10 lg:mt-0">
          {/* Elemento decorativo detrás de la foto */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl -z-10" />
          
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=70"
            alt="Perro y gato descansando juntos en un hogar"
            fetchPriority="high"
            decoding="async"
            loading="eager"
            className="w-full aspect-[4/5] object-cover rounded-[3rem] border-[12px] border-white shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}