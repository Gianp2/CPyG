import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Heart, Wallet, ShoppingBag, Ticket, Star, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import Toast from "../ui/Toast";

const DONATION_DATA = {
  alias: "comoperrosygatosarms",
  cvu: "0000003100062549564900",
  titular: "Eliana Belen Bufarino"
};

const ACTIVITIES = [
  { 
    icon: <ShoppingBag className="w-5 h-5" />, 
    title: "Ferias americanas",
    desc: "Ropa, calzado y objetos donados en excelente estado a precios comunitarios." 
  },
  { 
    icon: <Ticket className="w-5 h-5" />, 
    title: "Rifas solidarias",
    desc: "Campañas especiales en Pascuas, Navidad y rifas exprés destinadas a cubrir cirugías urgentes." 
  },
  { 
    icon: <Star className="w-5 h-5" />, 
    title: "Venta de merchandising",
    desc: "Nuestro fuerte absoluto: stickers y productos propios para llevar la causa a todos lados." 
  },
  { 
    icon: <Calendar className="w-5 h-5" />, 
    title: "Comida y Eventos",
    desc: "Venta de platos caseros y la organización de gra tradicionales fiestas retro." 
  }
];

export default function Donations() {
  const [copiedField, setCopiedField] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Mínima distancia en píxeles para considerar que fue un swapeo válido
  const minSwipeDistance = 50;

  const CAROUSEL_IMAGES = [
    {
      url: "feria1.jpeg",
      title: "Ferias Locales",
      desc: "Todo lo recaudado se transforma de inmediato en insumos médicos y alimento."
    },
    {
      url: "feria.jpeg",
    },
    {
      url: "feria2.jpeg",
      title: "Merchandising",
      desc: "Productos y material promocional de merchandising presentados en la feria."
    },
    {
      url: "feria3.jpeg",
    },
    {
      url: "feria4.jpeg",
    },
    {
      url: "merch.jpeg",
    },
    {
      url: "feria5.jpeg",
    },
    {
      url: "feriaamericana.jpeg",
      title: "Feria Americana",
      desc: "Ropa y calzado en excelente estado que la gente nos acerca para darles una segunda vida."
    },
    {
      url: "feriaamericana1.jpeg",
    },
    { 
      url: "retro.jpeg", 
      title: "Fiesta Retro Solidaria",
      desc: "Una noche llena de música, recuerdos y solidaridad."
    }
  ];

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setShowToast(true);

    setTimeout(() => {
      setCopiedField(null);
      setShowToast(false);
    }, 3000);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));
  };

  // Manejo de gestos táctiles para dispositivos móviles
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section
      id="donations"
      className="section-padding bg-brand-moss relative overflow-x-hidden w-full"
    >
      <div className="max-w-5xl mx-auto text-brand-bg relative z-10 px-6">
        
        {/* PARTE SUPERIOR: ¿CÓMO SOSTENEMOS LOS RESCATES? */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-md">
            <Heart className="w-10 h-10 fill-brand-bg" />
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold max-w-3xl mx-auto leading-tight">
            ¿Cómo sostenemos los rescates? 
          </h2>

          <p className="text-lg md:text-xl text-brand-bg/80 max-w-2xl mx-auto leading-relaxed">
            Nuestro trabajo es completamente voluntario. Brindamos primeros auxilios y atención médica los 365 días del año gracias al esfuerzo de la comunidad y a nuestras actividades solidarias.
          </p>
        </motion.div>

        {/* CONTENEDOR INTERMEDIO: DETALLE DE FERIAS/ACTIVIDADES + CARRUSEL DE FOTOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          
          {/* LISTA DETALLADA DE ACTIVIDADES COMPLETAS */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4 order-2 lg:order-1"
          >
            {ACTIVITIES.map((act, i) => (
              <div 
                key={i} 
                className="flex gap-4 items-start bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-xs hover:bg-white/15 transition-all"
              >
                <div className="p-2.5 bg-white/20 rounded-xl text-brand-bg shrink-0 mt-0.5">
                  {act.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-white mb-0.5">{act.title}</h4>
                  <p className="text-xs text-brand-bg/80 leading-relaxed font-medium">{act.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CARRUSEL VISUAL */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 order-1 lg:order-2 w-full relative"
          >
            <div 
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="relative h-[340px] md:h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group select-none touch-pan-y"
            >
              {/* Slides */}
              {CAROUSEL_IMAGES.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.title || "Imagen de actividad"}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white pointer-events-none">
                    <h4 className="text-xl font-bold font-serif mb-1">{img.title}</h4>
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed">{img.desc}</p>
                  </div>
                </div>
              ))}

              {/* Botones de navegación interna */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Indicadores inferiores */}
            <div className="flex justify-center gap-2 mt-4">
              {CAROUSEL_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeSlide ? "w-6 bg-white" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* SECCIÓN INFERIOR: CUENTAS DE TRANSFERENCIA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Formas de colaborar económicamente
            </h3>
            <p className="text-sm md:text-base text-brand-bg/70 max-w-xl mx-auto">
              Si querés y podés sumarte con un aporte directo para cirugías urgentes, medicamentos o alimento, te dejamos nuestras cuentas oficiales:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* CARD ALIAS */}
            <div className="bg-white/10 rounded-section p-8 text-brand-bg shadow-lg border border-white/20 backdrop-blur-sm flex flex-col justify-between h-full w-full">
              <div>
                <div className="flex items-center gap-3 mb-6 opacity-60">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-[10px]">
                    Alias Mercado Pago
                  </span>
                </div>

                <div className="flex justify-between items-center gap-4 mb-2">
                  <h3 className="text-xl md:text-2xl font-mono font-bold break-all select-all">
                    {DONATION_DATA.alias}
                  </h3>
                  <button
                    onClick={() => copyToClipboard(DONATION_DATA.alias, "alias")}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors shrink-0"
                    title="Copiar Alias"
                  >
                    {copiedField === "alias" ? (
                      <Check className="w-5 h-5 text-brand-light" />
                    ) : (
                      <Copy className="w-5 h-5 opacity-50" />
                    )}
                  </button>
                </div>

                <p className="opacity-80 font-medium text-sm">
                  {DONATION_DATA.titular}
                </p>
              </div>
            </div>

            {/* CARD CVU */}
            <div className="bg-brand-light/20 rounded-section p-8 text-brand-bg shadow-lg border border-white/10 backdrop-blur-sm flex flex-col justify-between h-full w-full">
              <div>
                <div className="flex items-center gap-3 mb-6 opacity-60">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-[10px]">
                    Datos Bancarios (CVU)
                  </span>
                </div>

                <div className="flex justify-between items-center gap-3 mb-4 overflow-hidden">
                  <h3 className="text-sm md:text-base font-mono font-bold break-all bg-white/10 p-3 rounded-lg flex-1 min-w-0 select-all">
                    {DONATION_DATA.cvu}
                  </h3>
                  <button
                    onClick={() => copyToClipboard(DONATION_DATA.cvu, "cvu")}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors shrink-0"
                    title="Copiar CVU"
                  >
                    {copiedField === "cvu" ? (
                      <Check className="w-5 h-5 text-brand-light" />
                    ) : (
                      <Copy className="w-5 h-5 opacity-50" />
                    )}
                  </button>
                </div>

                <p className="opacity-80 text-xs italic">
                  Transferencia directa a C&G
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <Toast
        isVisible={showToast}
        message={`¡${copiedField?.toUpperCase()} copiado correctamente!`}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}