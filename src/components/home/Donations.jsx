import { useState } from "react";
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

export default function Donations() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [copied, setCopied] = useState(null); // 'alias' o 'cvu'

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

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
          
          <div className="text-center mb-6">
             <p className="text-sm text-white/70">Titular de cuenta: <span className="font-bold text-white">{DONATION_DATA.titular}</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-3xl p-6 border border-white/20 flex flex-col items-center text-center">
              <Package className="w-10 h-10 mb-4 text-brand-bg" />
              <h4 className="font-bold mb-2">Donaciones</h4>
              <p className="text-xs text-brand-bg/80">Chalecos, frazadas, cuchas, alimento o ropa para ferias (en buen estado).</p>
            </div>

            <div className="bg-white/10 rounded-3xl p-6 border border-white/20 flex flex-col items-center text-center">
              <Heart className="w-10 h-10 mb-4 text-brand-bg" />
              <h4 className="font-bold mb-2">Alias Mercado Pago</h4>
              <button 
                onClick={() => handleCopy(DONATION_DATA.alias, 'alias')}
                className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg mt-2 hover:bg-white/30 transition text-sm font-mono font-bold"
              >
                {DONATION_DATA.alias}
                {copied === 'alias' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="bg-brand-light/20 rounded-3xl p-6 border border-white/10 flex flex-col items-center text-center">
              <Wallet className="w-10 h-10 mb-4 text-brand-bg" />
              <h4 className="font-bold mb-2">CVU</h4>
              <button 
                onClick={() => handleCopy(DONATION_DATA.cvu, 'cvu')}
                className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg mt-2 hover:bg-white/30 transition text-sm font-mono font-bold break-all"
              >
                {DONATION_DATA.cvu}
                {copied === 'cvu' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}