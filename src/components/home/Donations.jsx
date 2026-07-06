import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Wallet, ShoppingBag, Ticket, Star, Calendar, Package, Copy, Check } from "lucide-react";

const DONATION_DATA = {
  alias: "comoperrosygatosarms",
  cvu: "0000003100062549564900",
  titular: "Eliana Belen Bufarino"
};

const ACTIVITIES = [
  { icon: <ShoppingBag className="w-5 h-5" />, title: "Ferias americanas", desc: "Ropa, calzado y objetos donados en excelente estado." },
  { icon: <Ticket className="w-5 h-5" />, title: "Rifas solidarias", desc: "Campañas para cubrir cirugías y gastos urgentes." },
  { icon: <Star className="w-5 h-5" />, title: "Merchandising", desc: "Stickers y productos propios para llevar la causa." },
  { icon: <Calendar className="w-5 h-5" />, title: "Eventos", desc: "Platos caseros y fiestas retro solidarias." }
];

const CAROUSEL_IMAGES = [
  {
    url: "feria1.jpeg",
    title: "Ferias Locales",
    desc: "Cada compra ayuda a cubrir alimento, atención veterinaria y cuidados para los animales rescatados."
  },
  { url: "feria.jpeg" },
  {
    url: "feria2.jpeg",
    title: "Merchandising Solidario",
    desc: "Productos con propósito que colaboran directamente con el sostenimiento del refugio."
  },
  { url: "feria3.jpeg" },
  { url: "feria4.jpeg" },
  { url: "merch.jpeg" },
  {
    url: "feria5.jpeg",
    title: "Eventos Benéficos",
    desc: "Espacios de encuentro donde la comunidad se une para ayudar a nuestros rescatados."
  },
  {
    url: "feriaamericana.jpeg",
    title: "Feria Americana",
    desc: "Ropa y artículos con una segunda oportunidad que generan recursos para seguir rescatando vidas."
  },
  { url: "feriaamericana1.jpeg" },
  {
    url: "retro.jpeg",
    title: "Fiesta Retro",
    desc: "Una noche de música, diversión y solidaridad para apoyar nuestra misión."
  }
];

export default function Donations() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [copied, setCopied] = useState(null);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="donations" className="py-20 bg-brand-moss relative overflow-x-hidden w-full">
      <div className="max-w-5xl mx-auto text-brand-bg relative z-10 px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-16 space-y-6"
        >
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

          {/* Carrusel */}
          <div className="lg:col-span-7 relative h-[400px] w-full rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
            {CAROUSEL_IMAGES.map((img, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0 }}
                animate={{ opacity: index === activeSlide ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img 
                  src={img.url} 
                  alt={img.title || "Actividades"} 
                  className="w-full h-full object-cover" 
                />
                {img.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                    <h4 className="text-xl font-bold text-white">{img.title}</h4>
                    <p className="text-sm text-white/80">{img.desc}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECCIÓN DE AYUDA OPTIMIZADA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="space-y-8 max-w-3xl mx-auto"
        >
          <h3 className="text-3xl font-serif font-bold text-center mb-10">Formas de colaborar</h3>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
           
            {/* Tarjeta Donaciones Materiales */}
            <div className="bg-white/10 rounded-3xl p-6 border border-white/20 text-center h-full flex flex-col justify-center">
              <Package className="w-8 h-8 mx-auto mb-3 text-brand-bg" />
              <h4 className="font-bold mb-1">Donaciones materiales</h4>
              <p className="text-xs text-brand-bg/80 leading-snug">
                Chalecos, frazadas, cuchas, alimento o ropa para ferias (en buen estado).
              </p>
            </div>

            {/* Tarjeta de Aportes Económicos */}
            <div className="bg-white/10 rounded-3xl p-6 border border-white/20 text-center flex flex-col items-center">
              <Wallet className="w-8 h-8 mb-3 text-brand-bg" />
              <h4 className="font-bold mb-4">Aportes económicos</h4>
             
              <div className="flex flex-col items-center gap-4 w-full">
                {/* Alias */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-brand-bg/70 font-semibold">Alias</span>
                  <button
                    onClick={() => handleCopy(DONATION_DATA.alias, 'alias')}
                    className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition text-sm font-mono font-bold"
                  >
                    {DONATION_DATA.alias}
                    {copied === 'alias' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* CVU */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-brand-bg/70 font-semibold">CVU</span>
                  <button
                    onClick={() => handleCopy(DONATION_DATA.cvu, 'cvu')}
                    className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition text-sm font-mono font-bold"
                  >
                    {DONATION_DATA.cvu}
                    {copied === 'cvu' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
             
              <p className="text-[10px] text-white/50 mt-5">Titular: {DONATION_DATA.titular}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}