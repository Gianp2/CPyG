import { ArrowDown, HeartPulse } from "lucide-react";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[85vh] flex items-center pt-16 bg-brand-bg"
    >
      {/* Fondo decorativo */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-brand-light opacity-20 rounded-l-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

        {/* TEXTO (Corregido contraste y accesibilidad) */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/30 rounded-full text-brand-primary-dark text-xs font-bold uppercase tracking-widest mb-5">
            <HeartPulse className="w-4 h-4" />
            <span>Protectora Animal</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif text-brand-dark leading-tight mb-5">
            Cambiando vidas,
            <br />
            <span className="italic text-brand-secondary-dark">
              una pata a la vez.
            </span>
          </h1>

          {/* Subimos la opacidad del texto para pasar el audit de contraste */}
          <p className="text-base md:text-lg text-brand-dark mb-8 max-w-lg">
            Rescatamos, rehabilitamos y buscamos hogares responsables para cada
            animal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() =>
                document.getElementById("animals")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              // Agregamos aria-label por si el componente Button no lo maneja
              aria-label="Ver animales disponibles para adopción"
              className="bg-brand-secondary hover:bg-brand-primary text-white py-3 px-6 flex items-center justify-center gap-2 transition-colors"
            >
              Conocer animales
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* IMAGEN (LCP OPTIMIZED - SIN JAVASCRIPT DE POR MEDIO) */}
        <div className="lg:col-span-5 relative">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=70"
            alt="Perro y gato descansando juntos en un hogar"
            // Atributos críticos para Lighthouse
            fetchPriority="high"
            decoding="async"
            loading="eager"
            className="w-full aspect-[4/5] object-cover rounded-3xl border-8 border-white shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}