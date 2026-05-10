import { memo } from "react";

const getStatusStyles = (status) => {
  switch (status) {
    case "En adopción": return "bg-white/95 text-emerald-700 border border-emerald-100";
    case "Adoptado": return "bg-slate-100 text-slate-400 line-through opacity-75";
    default: return "bg-brand-bg text-brand-moss";
  }
};

function AnimalCard({ animal }) {
  const WHATSAPP_NUMBER = "5491123456789"; 
  const message = `¡Hola! Me gustaría obtener más información sobre ${animal.nombre} para adoptar.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const currentImage = animal.imagenURL || animal.imagen || animal.foto || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600";

  return (
    <article className="group bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-brand-border/40 shadow-sm transition-all duration-300 md:hover:shadow-xl">
      <div className="relative w-full aspect-square overflow-hidden bg-slate-50">
        <img
          src={currentImage}
          alt={animal.nombre}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 md:group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 z-10">
          <span className={`px-2 py-1 rounded-lg text-[8px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm ${getStatusStyles(animal.estado)}`}>
            {animal.estado}
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-base sm:text-lg font-bold text-brand-dark truncate capitalize leading-tight">
            {animal.nombre}
          </h3>
          <span className="shrink-0 bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-bold ml-1">
            {animal.edad}
          </span>
        </div>

        <div className="flex flex-col flex-grow">
          <p className="text-brand-secondary font-bold text-[8px] uppercase tracking-widest mb-1">
            {animal.tamaño}
          </p>
          <p className="text-slate-500 text-[11px] line-clamp-2 mb-4 italic">
            "{animal.descripcion || "Buscando un hogar con mucho amor."}"
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 rounded-xl bg-brand-primary text-white font-bold text-[10px] sm:text-xs text-center shadow-md active:scale-95 transition-all uppercase tracking-wider"
        >
          Adoptar a {animal.nombre.split(' ')[0]}
        </a>
      </div>
    </article>
  );
}

export default memo(AnimalCard);