import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Instagram,
  PawPrint,
  ExternalLink,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

const CONTACT_METHODS = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    label: "WhatsApp General",
    value: "+54 9 3471 34-7911",
    href: "https://wa.me/5493471347911",
    // Base color: Sage/Green
    bg: "bg-[#E9EDC9]/40",
    text: "text-[#588157]",
    hover: "hover:bg-[#588157] hover:text-white",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    label: "WhatsApp Castraciones",
    value: "+54 9 3471 00-0000", // Cambiar por el real si existe
    href: "https://wa.me/5493471000000",
    // Base color: Olive/Moss
    bg: "bg-[#CCD5AE]/40",
    text: "text-[#4F772D]",
    hover: "hover:bg-[#4F772D] hover:text-white",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    label: "Email",
    value: "adopciones@pyg.com",
    href: "mailto:adopciones@pyg.com",
    // Base color: Earth/Sand
    bg: "bg-[#FAEDCD]/50",
    text: "text-[#D4A373]",
    hover: "hover:bg-[#D4A373] hover:text-white",
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    label: "Instagram",
    value: "@comoperrosygatos",
    href: "https://www.instagram.com/comoperrosygatosarmstrong/",
    // Base color: Deep Jungle
    bg: "bg-[#DDE5B6]/50",
    text: "text-[#344E41]",
    hover: "hover:bg-[#344E41] hover:text-white",
  },
];

export default function Contact() {
  const handleContactClick = (label) => {
    toast.success(`Abriendo ${label}`, {
      description: "¡Gracias por ponerte en contacto con nosotros!",
      icon: <Heart className="w-4 h-4 text-red-500 fill-red-500" />,
      duration: 3000,
    });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <PawPrint className="w-3 h-3" />
            Contacto
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-serif text-slate-800 mb-6 tracking-tight">
            ¡Estamos a un{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-brand-primary">click</span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-brand-secondary/40 -z-0"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,10 Q50,0 100,10"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </span>{" "}
            de distancia!
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            ¿Tenés dudas sobre el proceso de adopción o querés colaborar con
            nosotros? Contactanos por cualquiera de estos medios.
          </p>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_METHODS.map((method, i) => (
            <motion.a
              key={i}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleContactClick(method.label)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className={`group relative p-8 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-500 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200 cursor-pointer ${method.bg} ${method.text} ${method.hover}`}
            >
              {/* Icono Flotante */}
              <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {method.icon}
              </div>

              {/* Texto */}
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-3 opacity-60">
                {method.label}
              </h4>

              <p className="text-base font-bold font-sans break-all leading-tight">
                {method.value}
              </p>

              {/* Botón sutil que aparece en Hover */}
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                IR AHORA <ExternalLink className="w-3 h-3" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Banner Inferior Informativo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 bg-white rounded-[3rem] border border-brand-border flex flex-col md:flex-row items-center justify-between gap-8 shadow-inner relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute top-[-20%] right-[-5%] opacity-[0.03] pointer-events-none">
            <PawPrint className="w-64 h-64 rotate-12" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group">
              <div className="w-20 h-20 bg-brand-secondary rounded-[2rem] flex items-center justify-center text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <PawPrint className="w-10 h-10" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white border-4 border-white">
                <Heart className="w-3 h-3 fill-current" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-brand-dark tracking-tight mb-2">
                Protectora de animales
              </h3>
              <p className="text-slate-500 font-medium text-lg max-w-xl">
                Trabajamos de forma{" "}
                <span className="text-brand-primary italic font-semibold">
                  independiente
                </span>{" "}
                con redes de voluntarios y hogares de tránsito en{" "}
                <span className="text-slate-700 font-bold underline decoration-brand-secondary/30">
                  Armstrong
                </span>.
              </p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-brand-dark text-white rounded-2xl font-bold text-sm shadow-xl hidden lg:block"
          >
            #SumateAAdoptar
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}