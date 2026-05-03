import { memo, useState } from "react";
import { X, MessageCircle, CheckCircle2 } from "lucide-react"; // Usamos iconos para los requisitos

const getStatusStyles = (status) => {
  switch (status) {
    case "En adopción": return "bg-blue-100 text-blue-700";
    case "Adoptado": return "bg-gray-100 text-gray-500 line-through";
    default: return "bg-slate-100 text-slate-700";
  }
};

function AnimalCard({ animal, index }) {
  const [showModal, setShowModal] = useState(false);
  const statusClass = getStatusStyles(animal.estado);

  const imageUrl = animal.imagenURL?.trim()
    ? animal.imagenURL
    : "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600";

  const isPriority = index < 2;

  // Configuración de WhatsApp
  const WHATSAPP_NUMBER = "5493471347911"; 
  const message = `Hola! Estoy interesado en adoptar a ${animal.nombre}.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const requisitos = [
    "Ser mayor de 21 años.",
    "Espacio seguro y cercado.",
    "Compromiso de castración y vacunas.",
    "Solvencia para gastos veterinarios y alimentación.",
    "Mucho amor y paciencia para su adaptación."
  ];

  return (
    <>
      <article className="group bg-white rounded-3xl overflow-hidden border border-brand-border flex flex-col transition-shadow duration-300 hover:shadow-lg">
        {/* IMAGE CONTAINER */}
        <div className="relative aspect-square overflow-hidden bg-gray-200">
          <img
            src={imageUrl}
            alt={`Foto de ${animal.nombre}`}
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "low"}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm ${statusClass}`}>
              {animal.estado}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-center mb-2 gap-2">
            <h3 className="text-lg font-bold text-brand-dark">{animal.nombre}</h3>
            <span className="text-brand-primary text-sm font-semibold">{animal.edad}</span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-5">
            {animal.tamaño} • {animal.descripcion}
          </p>

          <button
            onClick={() => setShowModal(true)} // Abrir modal
            type="button"
            className="mt-auto w-full py-3 rounded-xl bg-brand-bg border border-brand-border font-semibold text-sm hover:bg-brand-primary hover:text-white transition-all active:scale-95"
          >
            Quiero adoptar
          </button>
        </div>
      </article>

      {/* MODAL DE REQUISITOS */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="relative p-8 pb-4 text-center">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
              <h2 className="text-2xl font-black text-brand-dark mb-2">Requisitos para adoptar a {animal.nombre}</h2>
              <p className="text-slate-500 text-sm font-medium italic">Buscamos el mejor hogar para ellos</p>
            </div>

            {/* Lista de Requisitos */}
            <div className="px-8 py-4 space-y-3">
              {requisitos.map((req, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-brand-beige/20 border border-brand-accent/20">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 font-medium leading-tight">{req}</p>
                </div>
              ))}
            </div>

            {/* Footer con Botón WhatsApp */}
            <div className="p-8 pt-4 flex flex-col items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white rounded-2xl font-black text-lg shadow-lg shadow-green-200 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                Contactar por WhatsApp
              </a>
              <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Tu consulta no es compromiso de adopción!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(AnimalCard);