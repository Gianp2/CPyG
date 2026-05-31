import { memo } from "react";

const getStatusStyles = (status) => {
  switch (status) {
    case "En adopción":
      return "bg-white/95 text-emerald-700 border border-emerald-100";
    case "Adoptado":
      return "bg-slate-100 text-slate-400 line-through opacity-75";
    default:
      return "bg-brand-bg text-brand-moss";
  }
};

function AnimalCard({ animal }) {
  // Lógica de imagen
  let currentImage =
    animal.imagenURL ||
    animal.imagen ||
    animal.foto ||
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=60&w=400";

  if (currentImage.includes("unsplash.com") && !currentImage.includes("&w=")) {
    currentImage += "&w=400&q=60";
  }

  // Generación del mensaje de WhatsApp
  const mensaje = `Hola me interesa adoptar a ${animal.nombre}.

      FORMULARIO DE ADOPCIÓN RESPONSABLE 

      Necesitamos que nos envíes estos datos en un mensaje:

      Nombre y apellido:
      Dirección y localidad:
      Celular o redes de contacto: 

      Sobre el cuidado del animal
      ¿Tenés otros animales?
      Cantidad, qué son y si están castrados.

      ¿Tu patio está cerrado?
      En días de frío o calor, ¿los tendrías adentro o con comodidades?

      ¿Brindarías atención veterinaria cuando lo necesite?`;

  const whatsappLink = `https://wa.me/5493471347911?text=${encodeURIComponent(mensaje)}`;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-brand-border/40 shadow-sm transition-all duration-300 md:hover:shadow-md">
      <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
        <img
          src={currentImage}
          alt={`Foto de ${animal.nombre}`}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />

        <div className="absolute top-2 left-2 z-10">
          <span
            className={`px-2 py-1 rounded-lg text-[8px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm ${getStatusStyles(
              animal.estado
            )}`}
          >
            {animal.estado}
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-base sm:text-lg font-bold text-brand-dark truncate capitalize leading-tight">
            {animal.nombre}
          </h3>

          <span className="shrink-0 bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-bold ml-1">
            {animal.edad}
          </span>
        </div>

        <div className="flex flex-col grow">
          <p className="text-brand-secondary font-bold text-[8px] uppercase tracking-widest mb-1">
            {animal.tamaño}
          </p>

          <p className="text-slate-500 text-[11px] line-clamp-2 mb-4 italic">
            "{animal.descripcion || "Buscando un hogar con mucho amor."}"
          </p>
        </div>

        {/* Botón de WhatsApp con el verde del formulario */}
        {animal.estado === "En adopción" && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#588157] hover:bg-[#4A6D49] text-white text-center py-2 rounded-xl text-xs font-bold transition-colors"
          >
            Contactar por WhatsApp
          </a>
        )}

      </div>
    </article>
  );
}

export default memo(AnimalCard);