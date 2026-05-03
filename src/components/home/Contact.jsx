import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Instagram,
  PawPrint,
} from "lucide-react";
import { toast } from "sonner"; // Importamos toast

const CONTACT_METHODS = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    label: "WhatsApp General",
    value: "+54 9 3471 34-7911",
    href: "https://wa.me/5493471347911",
    color:
      "bg-[#E9EDC9]/30 text-[#588157] hover:bg-[#588157] hover:text-white",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    label: "WhatsApp Castraciones",
    value: "+54 9 3471 00-0000",
    href: "https://wa.me/5493471000000",
    color:
      "bg-[#DDE5B6]/40 text-[#4F772D] hover:bg-[#4F772D] hover:text-white",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    label: "Email",
    value: "adopciones@pyg.com",
    href: "mailto:adopciones@pyg.com",
    color:
      "bg-[#5A5A40]/10 text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white",
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    label: "Instagram",
    value: "@comoperrosygatos",
    href: "https://www.instagram.com/comoperrosygatosarmstrong/",
    color:
      "bg-[#A3B18A]/20 text-[#344E41] hover:bg-[#344E41] hover:text-white",
  },
];

export default function Contact() {
  
  // Función para manejar el clic y mostrar la alerta
  const handleContactClick = (label) => {
    toast.info(`Abriendo ${label}...`, {
      description: "¡Gracias por ponerte en contacto!",
      duration: 3000,
    });
  };

  return (
    <section id="contact" className="section-padding bg-transparent">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-serif text-brand-dark mb-4 tracking-tight">
          ¡Estamos a un{" "}
          <span className="text-brand-primary italic">click</span> de distancia!
        </h2>

        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          ¿Tenes dudas sobre el proceso de adopción o queres colaborar con
          nosotros? Contactanos por cualquiera de estos medios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {CONTACT_METHODS.map((method, i) => (
          <motion.a
            key={i}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleContactClick(method.label)} // Ejecuta el toast al clickear
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className={`p-10 rounded-card flex flex-col items-center text-center transition-all duration-300 shadow-sm border border-brand-border hover:scale-105 hover:shadow-xl cursor-pointer ${method.color}`}
          >
            <div className="mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm">
              {method.icon}
            </div>

            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-70">
              {method.label}
            </h4>

            <p className="text-lg font-bold font-sans break-words">
              {method.value}
            </p>
          </motion.a>
        ))}
      </div>

      <div className="mt-20 p-12 bg-white/40 rounded-section border border-brand-border flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-brand-secondary rounded-3xl flex items-center justify-center text-white shadow-md rotate-3 hover:rotate-0 transition-transform duration-300">
            <PawPrint className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-brand-dark tracking-tight">
              Protectora de animales
            </h3>

            <p className="text-slate-500 font-medium">
              Trabajamos de forma independiente con redes de voluntarios y
              hogares de tránsito en Armstrong.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}