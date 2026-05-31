import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Instagram,
  Facebook,
  Music, // Icono para TikTok
  PawPrint,
  ExternalLink,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

const PHONE_METHODS = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    label: "WhatsApp Voluntarios",
    value: "+54 9 3471 34-6672",
    href: "https://wa.me/5493471346672",
    bg: "bg-[#FAEDCD]/50",
    text: "text-[#bc6c25]",
    hover: "hover:bg-[#D4A373] hover:text-white",
  },
];

const SOCIAL_METHODS = [
  {
    icon: <Instagram className="w-6 h-6" />,
    label: "Instagram",
    value: "@comoperrosygatos",
    href: "https://www.instagram.com/comoperrosygatosarmstrong/",
    bg: "bg-[#DDE5B6]/50",
    text: "text-[#1b4332]",
    hover: "hover:bg-[#344E41] hover:text-white",
  },
  {
    icon: <Facebook className="w-6 h-6" />,
    label: "Facebook",
    value: "Como Perros y Gatos Armstrong",
    href: "https://www.facebook.com/comoperrosygatos.adopciones.3?locale=es_LA",
    bg: "bg-[#B5E2FA]/40",
    text: "text-[#00509d]",
    hover: "hover:bg-[#4A90E2] hover:text-white",
  },
  {
    icon: <Music className="w-6 h-6" />,
    label: "TikTok",
    value: "@comoperrosygatos",
    href: "https://www.tiktok.com/@comoperrosygatosarms?_r=1&_t=ZS-96pIm4X9DhX", // Aquí agregarás tu URL más tarde
    bg: "bg-[#f8d7da]/50",
    text: "text-[#000000]",
    hover: "hover:bg-[#000000] hover:text-white",
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
    <section id="contact" className="py-12 md:py-20 px-4 md:px-6 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-4 md:mb-6"
          >
            <PawPrint className="w-3 h-3" />
            Contacto
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-serif text-slate-800 mb-4 md:mb-6 tracking-tight leading-tight">
            ¡Estamos a un{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-brand-primary">click</span>
              <svg
                className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 text-brand-secondary/40 z-0"
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

          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg px-2">
            ¿Tenés dudas sobre el proceso de adopción o querés colaborar con
            nosotros? Contactanos por cualquiera de estos medios.
          </p>
        </div>

        {/* CONTENEDOR DE TARJETAS */}
        <div className="space-y-10 md:space-y-14">
          
          {/* Bloque de WhatsApp */}
          <div className="space-y-4">
            <span className="block text-center text-[11px] md:text-xs font-bold tracking-widest text-slate-400 uppercase">
              Línea de contacto
            </span>
            <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
              {PHONE_METHODS.map((method, i) => (
                <motion.a
                  key={i}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleContactClick(method.label)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className={`group relative p-6 md:p-8 rounded-3xl md:rounded-section flex flex-col items-center text-center transition-all duration-500 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200 cursor-pointer w-full md:w-[300px] ${method.bg} ${method.text} ${method.hover}`}
                >
                  <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {method.icon}
                  </div>
                  <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-2 md:mb-3 opacity-80">
                    {method.label}
                  </h4>
                  <p className="text-base md:text-lg font-extrabold font-sans break-all leading-tight px-2">
                    {method.value}
                  </p>
                  <div className="mt-4 md:mt-6 flex items-center gap-2 text-[10px] font-bold opacity-70 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    IR AHORA <ExternalLink className="w-3 h-3" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Bloque de Redes Sociales */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <span className="block text-center text-[11px] md:text-xs font-bold tracking-widest text-slate-400 uppercase">
              Redes Sociales
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {SOCIAL_METHODS.map((method, i) => (
                <motion.a
                  key={i}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleContactClick(method.label)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className={`group relative p-6 md:p-8 rounded-3xl md:rounded-section flex flex-col items-center text-center transition-all duration-500 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200 cursor-pointer ${method.bg} ${method.text} ${method.hover}`}
                >
                  <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {method.icon}
                  </div>
                  <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-2 md:mb-3 opacity-80">
                    {method.label}
                  </h4>
                  <p className="text-base md:text-lg font-extrabold font-sans break-all leading-tight px-2">
                    {method.value}
                  </p>
                  <div className="mt-4 md:mt-6 flex items-center gap-2 text-[10px] font-bold opacity-70 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    IR AHORA <ExternalLink className="w-3 h-3" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Banner Inferior Informativo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 p-6 md:p-12 bg-white rounded-3xl md:rounded-[3rem] border border-brand-border flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-inner relative overflow-hidden"
        >
          <div className="absolute top-[-20%] right-[-5%] opacity-[0.02] md:opacity-[0.03] pointer-events-none hidden sm:block">
            <PawPrint className="w-64 h-64 rotate-12" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 relative z-10 w-full text-center sm:text-left">
            <div className="relative group shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-secondary rounded-2xl md:rounded-4xl flex items-center justify-center text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <PawPrint className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-brand-primary rounded-full flex items-center justify-center text-white border-2 md:border-4 border-white">
                <Heart className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-bold text-brand-dark tracking-tight">
                Protectora de animales
              </h3>
              <p className="text-slate-500 font-medium text-base md:text-lg max-w-xl leading-relaxed">
                Trabajamos de forma{" "}
                <span className="text-brand-primary italic font-semibold">
                  independiente
                </span>{" "}
                con redes de voluntarios y hogares de tránsito en{" "}
                <span className="text-slate-700 font-bold underline decoration-brand-secondary/30">
                  Armstrong
                </span>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}