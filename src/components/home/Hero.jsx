import { ArrowDown, HeartPulse, Users, PawPrint } from "lucide-react";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <>
      <section
        id="inicio"
        className="relative min-h-screen flex items-center pt-32 md:pt-40 pb-16 bg-brand-bg overflow-hidden"
      >
        {/* Fondo decorativo */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-brand-light opacity-10 rounded-l-full -z-10 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* COLUMNA DE TEXTO */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/20 rounded-full text-brand-primary-dark text-xs font-bold uppercase tracking-widest mb-6">
              <HeartPulse className="w-4 h-4" />
              <span>Protectora Animal Armstrong</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-brand-dark leading-[1.1] mb-6">
              Cambiando vidas,
              <br />
              <span className="italic text-brand-secondary-dark relative">
                una pata a la vez.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2 text-brand-secondary/30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 0 100 5"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
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

          {/* COLUMNA DE IMAGEN */}
          <div className="lg:col-span-6 relative mt-10 lg:mt-0 flex justify-center w-full">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/15 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-secondary/15 rounded-full blur-3xl -z-10" />

            <div className="relative w-full max-w-[640px] aspect-[3/2] rounded-[2.5rem] border-[10px] border-white shadow-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
              <img
                src="/hero.jpeg"
                alt="Equipo de voluntarios de la protectora de animales"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-4 right-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 border border-slate-100 transform translate-x-2 translate-y-2 z-20">
              <div className="p-1.5 bg-brand-secondary/20 text-brand-secondary-dark rounded-xl">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-700">Nuestro Equipo</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARADOR ESTÉTICO CENTRADO */}
      <div className="w-full flex justify-center items-center py-12 px-6">
        <div className="flex items-center gap-4 w-full max-w-sm">
          {/* Línea izquierda */}
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-brand-primary/50" />
          
          {/* Icono central (puedes cambiarlo por un círculo si prefieres) */}
          <PawPrint className="w-5 h-5 text-brand-primary opacity-80" />
          
          {/* Línea derecha */}
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-brand-primary/50" />
        </div>
      </div>
    </>
  );
}