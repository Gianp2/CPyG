import { motion } from "framer-motion";
import { Users, Heart, ShieldCheck } from "lucide-react";

const VALUES = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Comunidad",
    desc: "Somos un grupo de voluntarios apasionados por el bienestar animal."
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Amor",
    desc: "Cada animal rescatado recibe todo el cariño que se merece."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Compromiso",
    desc: "Nos aseguramos de que cada adopción sea responsable y duradera."
  },
];

export default function About() {
  return (
    /* 
      CAMBIO CLAVE: overflow-x-hidden en la sección para que nada (como el blur)
      se escape por los costados. w-full asegura que ocupe el ancho correcto.
    */
    <section id="about" className="section-padding bg-transparent overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto px-6"> {/* Agregado wrapper de ancho máximo y padding lateral */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-section overflow-hidden shadow-sm border-8 border-white relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800" 
                alt="Nuestra labor y compromiso" 
                className="w-full h-auto aspect-square object-cover"
              />
            </div>
            
            {/* 
               AJUSTE: Reduje un poco el -right-10 a -right-4 en móviles 
               o simplemente confío en el overflow-x-hidden del padre.
            */}
            <div className="absolute -bottom-10 -right-4 md:-right-10 w-48 h-48 bg-brand-light rounded-full -z-10 blur-2xl opacity-50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-brand-dark mb-6 leading-tight">
              Nuestra historia y <span className="text-brand-secondary italic">misión</span>
            </h2>
            <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
              "Como Perros & Gatos" nació de la necesidad de dar voz a quienes no la tienen. Somos una protectora independiente dedicada al rescate y rehabilitación de animales en situaciones vulnerables.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              {VALUES.map((val, i) => (
                <div key={i} className="flex gap-4 items-center group p-4 rounded-2xl hover:bg-white shadow-sm transition-all border border-transparent hover:border-brand-border">
                  <div className="p-3 bg-brand-light rounded-xl text-brand-primary group-hover:scale-110 transition-transform shrink-0">
                    {val.icon}
                  </div>
                  <div className="min-w-0"> {/* Evita que el texto largo rompa el layout flex */}
                    <h4 className="text-lg font-bold text-brand-dark mb-0.5 font-sans">{val.title}</h4>
                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-snug">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}