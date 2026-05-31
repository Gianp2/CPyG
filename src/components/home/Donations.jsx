import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Heart, Wallet, ShoppingBag, Ticket, Star, Calendar, ArrowLeft, ArrowRight, Package } from "lucide-react";
import Toast from "../ui/Toast";

const DONATION_DATA = {
  alias: "comoperrosygatosarms",
  cvu: "0000003100062549564900",
  whatsapp: "5493471347911" // Reemplaza con tu número real
};

const ACTIVITIES = [
  { icon: <ShoppingBag className="w-5 h-5" />, title: "Ferias americanas", desc: "Ropa, calzado y objetos donados en excelente estado." },
  { icon: <Ticket className="w-5 h-5" />, title: "Rifas solidarias", desc: "Campañas para cubrir cirugías y gastos urgentes." },
  { icon: <Star className="w-5 h-5" />, title: "Merchandising", desc: "Stickers y productos propios para llevar la causa." },
  { icon: <Calendar className="w-5 h-5" />, title: "Eventos", desc: "Platos caseros y fiestas retro solidarias." }
];

export default function Donations() {
  const [showToast, setShowToast] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const CAROUSEL_IMAGES = [
    { url: "feria1.jpeg", title: "Ferias Locales", desc: "Insumos y alimento." },
    { url: "feria.jpeg" },
    { url: "feria2.jpeg", title: "Merchandising", desc: "Productos de nuestra causa." },
    { url: "feria3.jpeg" },
    { url: "feria4.jpeg" },
    { url: "merch.jpeg" },
    { url: "feria5.jpeg" },
    { url: "feriaamericana.jpeg", title: "Feria Americana", desc: "Segunda oportunidad." },
    { url: "feriaamericana1.jpeg" },
    { url: "retro.jpeg", title: "Fiesta Retro", desc: "Música y solidaridad." }
  ];

  const handleContact = (tipo) => {
    const mensaje = `Hola, me gustaría colaborar con ustedes mediante ${tipo}. ¿Me podrían pasar los datos?`;
    window.open(`https://wa.me/${DONATION_DATA.whatsapp}?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  return (
    <section id="donations" className="section-padding bg-brand-moss relative overflow-x-hidden w-full">
      <div className="max-w-5xl mx-auto text-brand-bg relative z-10 px-6">
        
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 space-y-6">
          <div className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-md">
            <Heart className="w-10 h-10 fill-brand-bg" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold">¿Cómo sostenemos los rescates?</h2>
          <p className="text-lg md:text-xl text-brand-bg/80 max-w-2xl mx-auto">
            Nuestro trabajo es voluntario. Todo lo recaudado se destina a atención médica y alimento los 365 días del año.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          <div className="lg:col-span-5 space-y-4">
            {ACTIVITIES.map((act, i) => (
              <div key={i} className="flex gap-4 items-start bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
                <div className="p-2.5 bg-white/20 rounded-xl text-brand-bg">{act.icon}</div>
                <div>
                  <h4 className="font-bold text-white">{act.title}</h4>
                  <p className="text-xs text-brand-bg/80 leading-relaxed">{act.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 relative h-85 w-full rounded-3xl overflow-hidden border-4 border-white/10">
            {CAROUSEL_IMAGES.map((img, index) => (
              <div key={index} className={`absolute inset-0 transition-opacity duration-700 ${index === activeSlide ? "opacity-100" : "opacity-0"}`}>
                <img src={img.url} alt="Actividades" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                  <h4 className="text-xl font-bold text-white">{img.title}</h4>
                  <p className="text-sm text-white/80">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECCIÓN DE AYUDA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8 max-w-4xl mx-auto">
          <h3 className="text-3xl font-serif font-bold text-center mb-10">Formas de colaborar</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Donaciones en Especie */}
            <div className="bg-white/10 rounded-3xl p-6 border border-white/20 flex flex-col items-center text-center">
              <Package className="w-10 h-10 mb-4 text-brand-bg" />
              <h4 className="font-bold mb-2">Donaciones en Especie</h4>
              <p className="text-xs text-brand-bg/80 mb-4 flex-1">Chalecos, frazadas, cuchas, alimento o ropa para ferias (en buen estado).</p>
              <button onClick={() => handleContact("donaciones en especie")} className="bg-white text-brand-moss px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/90 transition">Contactar</button>
            </div>

            {/* Alias */}
            <div className="bg-white/10 rounded-3xl p-6 border border-white/20 flex flex-col items-center text-center">
              <Heart className="w-10 h-10 mb-4 text-brand-bg" />
              <h4 className="font-bold mb-2">Alias Mercado Pago</h4>
              <p className="text-xs text-brand-bg/80 mb-4 flex-1">Aporte económico directo para insumos y cirugías.</p>
              <button onClick={() => handleContact("transferencia por alias")} className="bg-white text-brand-moss px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/90 transition">Solicitar Alias</button>
            </div>

            {/* CVU */}
            <div className="bg-brand-light/20 rounded-3xl p-6 border border-white/10 flex flex-col items-center text-center">
              <Wallet className="w-10 h-10 mb-4 text-brand-bg" />
              <h4 className="font-bold mb-2">Datos Bancarios</h4>
              <p className="text-xs text-brand-bg/80 mb-4 flex-1">Transferencia directa a cuenta bancaria oficial.</p>
              <button onClick={() => handleContact("datos de CVU")} className="bg-white text-brand-moss px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/90 transition">Solicitar CVU</button>
            </div>
          </div>
        </motion.div>
      </div>

      <Toast isVisible={showToast} message="Redirigiendo a WhatsApp..." onClose={() => setShowToast(false)} />
    </section>
  );
}