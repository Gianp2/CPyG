import React from 'react';

/**
 * Componente Loader estético para "Como Perros & Gatos"
 * @param {string} size - Puede ser "sm", "md" o "lg"
 */
export default function Loader({ size = "md" }) {
  // Definición de escalas para mantener coherencia visual
  const sizes = {
    sm: {
      container: "h-6 w-6",
      border: "border-2"
    },
    md: {
      container: "h-12 w-12",
      border: "border-4"
    },
    lg: {
      container: "h-16 w-16",
      border: "border-[6px]"
    }
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-5">
      <div className={`relative ${currentSize.container}`}>
        
        {/* Aro de fondo: le da una base sólida al diseño */}
        <div 
          className={`
            ${currentSize.container} 
            ${currentSize.border} 
            rounded-full 
            border-brand-primary/10
          `}
        ></div>
        
        {/* Aro animado: el que gira con efecto de estela */}
        <div 
          className={`
            ${currentSize.container} 
            ${currentSize.border} 
            animate-spin 
            rounded-full 
            border-brand-primary 
            border-t-transparent 
            absolute top-0 left-0
            shadow-sm
          `}
        ></div>
      </div>

      {/* Indicador de texto con animación de pulso */}
      {size !== "sm" && (
        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-dark/30 animate-pulse">
          Cargando
        </p>
      )}
    </div>
  );
}