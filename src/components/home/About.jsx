import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Scissors, Activity, Sparkles, Building2, Syringe, ArrowLeft, ArrowRight } from "lucide-react";

const ACTIONS = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Rescatar y Proteger",
    desc: "Los 365 días del año rescatamos animales en situación de abandono (cunetas, campos, basurales y zonas urbanas), madres con crías o casos críticos."
  },
  {
    icon: <Scissors className="w-6 h-6" />,
    title: "Castrar",
    desc: "Creemos en cortar el problema de raíz. Participamos en 5 campañas masivas anuales y gestionamos turnos gratuitos en veterinarias locales."
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Sanar",
    desc: "Brindamos primeros auxilios y atención veterinaria a animales heridos, enfermos o en estado crítico, asumiendo su total rehabilitación."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Adoptar Responsablemente",
    desc: "Registramos cada adopción bajo compromiso de castración obligatoria para garantizar un futuro seguro y feliz."
  },
];

export default function About() {
  const [activeSlide, setActiveSlide] = useState(0);

  const ABOUT_IMAGES = [
    { url: "nosotros.jpeg", alt: "Voluntarios trabajando en Armstrong" },
    { url: "nosotros1.jpeg", alt: "Rescatados de la agrupación" },
    { url: "nosotros2.jpeg", alt: "Labor comunitaria en Armstrong" }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === ABOUT_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? ABOUT_IMAGES.length - 1 : prev - 1));
  };

  return (
    <section id="about" className="section-padding bg-transparent overflow-x-hidden w-full space-y-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* COLUMNA IZQUIERDA: CARRUSEL DE IMÁGENES */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full relative group"
          >
            <div className="relative h-[350px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl border-8 border-white bg-slate-100">
              {/* Slides */}
              {ABOUT_IMAGES.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Botones de navegación */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                aria-label="Anterior imagen"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                aria-label="Siguiente imagen"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Indicadores de bolitas inferiores */}
            <div className="flex justify-center gap-2 mt-4">
              {ABOUT_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeSlide ? "w-6 bg-brand-primary" : "w-2 bg-brand-primary/30"
                  }`}
                />
              ))}
            </div>

            {/* Efecto decorativo de fondo */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-brand-light rounded-full -z-10 blur-2xl opacity-40" />
          </motion.div>

          {/* COLUMNA DERECHA: TEXTO INFORMATIVO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <span className="text-sm font-bold tracking-wider uppercase text-brand-primary block mb-2">🐾 Agrupación Voluntaria</span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-dark mb-6 leading-tight">
              ¿Quiénes <span className="text-brand-secondary italic">somos</span>?
            </h2>
            <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
              Somos ciudadanas y ciudadanos de <strong>Armstrong, Santa Fe (Argentina)</strong> que compartimos un mismo propósito: construir un present y un futuro mejor para los animales de nuestra ciudad. Nuestro lema nos guía en cada paso que damos de manera integral y comprometida.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACTIONS.map((val, i) => (
                <div key={i} className="flex gap-4 items-start group p-4 rounded-2xl hover:bg-white shadow-sm transition-all border border-transparent hover:border-brand-border">
                  <div className="p-3 bg-brand-light rounded-xl text-brand-primary group-hover:scale-110 transition-transform shrink-0">
                    {val.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-brand-dark mb-1 font-sans">{val.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* SECCIÓN INTEGRADA CON TEXTOS COMPLETAMENTE CENTRADOS */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-light/40 border border-brand-border/60 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-10"
        >
          {/* Encabezado del bloque */}
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-xs font-bold tracking-wider uppercase text-brand-primary block mb-2">
              Salud Pública y Prevención
            </span>
            <h3 className="text-2xl md:text-4xl font-serif text-brand-dark mb-4">
              Trabajo en castraciones y concientización
            </h3>
            <p className="text-sm md:text-base text-brand-dark/70 leading-relaxed">
              Apostamos fuerte a la castración masiva como la herramienta más efectiva para reducir el abandono. No solo actuamos ante la emergencia, también educamos y prevenimos.
            </p>
          </div>

          {/* Tarjetas inferiores con contenido centrado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl text-center">
            
            {/* Tarjeta 1: Campañas */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-brand-border/40 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center text-brand-primary mb-3">
                <Building2 className="w-5 h-5 mb-1" />
                <h4 className="font-bold text-brand-dark">Campañas de Castración Masivas</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                Colaboramos activamente en <strong>5 campañas de castración masiva al año</strong> coordinadas junto a la Municipalidad de Armstrong, garantizando jornadas gratuitas para la comunidad.
              </p>
            </div>

            {/* Tarjeta 2: Turnos y Veterinarias */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-brand-border/40 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center text-brand-primary mb-3">
                <Syringe className="w-5 h-5 mb-1" />
                <h4 className="font-bold text-brand-dark">Turnos en Veterinarias</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 max-w-md">
                Gestionamos <strong>30 turnos mensuales gratuitos</strong> otorgados por el municipio en las veterinarias aliadas de la ciudad:
              </p>
              <div className="flex flex-wrap gap-2 justify-center pt-1">
                <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">El Estribo</span>
                <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">San Jorge</span>
                <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">El Palenque</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}