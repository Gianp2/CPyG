import { memo, useState, useEffect } from "react";

function AnimalCard({ animal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  const currentImage =
    animal.imagenURL ||
    animal.imagen ||
    animal.foto ||
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80";

  const whatsappLink = `https://wa.me/5493471347911?text=${encodeURIComponent(
    `Hola, me interesa adoptar a "${animal.nombre}"\n\n` +
    `FORMULARIO DE ADOPCIÓN RESPONSABLE\n` +
    `Necesitamos que nos envíes estos datos:\n\n` +
    `Nombre y Apellido:\n` +
    `Dirección y Localidad:\n` +
    `Celular o Redes de Contacto:\n\n` +
    `Sobre el cuidado del animal:\n` +
    `¿Tenés otros animales? Cantidad, qué son y si están castrados.\n` +
    `¿Tu patio está cerrado?\n` +
    `En días de frío o calor, ¿los tendrías adentro o con comodidades?\n` +
    `¿Brindarías atención veterinaria cuando lo necesite?`
  )}`;

  return (
    <>
      {/* CARD */}
      <article className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img
            src={currentImage}
            alt={animal.nombre}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          
          {animal.edad && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-700 text-xs font-medium px-3 py-1 rounded-2xl shadow">
              {animal.edad}
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-2xl font-bold text-slate-800 mb-2 line-clamp-2">
            {animal.nombre}
          </h3>

          <p className="text-slate-600 text-[15px] leading-relaxed line-clamp-3 mb-6 flex-1">
            {animal.descripcion}
          </p>

          <div className="flex gap-3 mb-6 text-sm">
            {animal.sexo && (
              <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-xl font-medium">
                {animal.sexo}
              </div>
            )}
            {animal.tamaño && (
              <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-xl font-medium">
                {animal.tamaño}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-auto w-full bg-[#588157] hover:bg-[#4a6c4a] active:bg-[#3f5c3f] text-white py-3.5 rounded-2xl font-semibold text-base transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Conocer más
          </button>
        </div>
      </article>

      {/* MODAL */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-full max-w-3xl rounded-[32px] overflow-hidden shadow-2xl max-h-[94vh] flex flex-col"
          >
            {/* Botón Cerrar Mejorado */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 z-40 w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-3xl leading-none text-slate-500 hover:text-slate-800 hover:bg-slate-100 active:scale-95 transition-all duration-200 border border-slate-100 hover:border-slate-200"
            >
              ✕
            </button>

            <div className="overflow-y-auto flex-1">
              {/* Imagen Modal */}
              <div className="relative bg-slate-950 flex items-center justify-center min-h-[320px] md:min-h-[420px]">
                <img
                  src={currentImage}
                  alt={animal.nombre}
                  className="max-h-[520px] w-auto max-w-full object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-1/2" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
                    {animal.nombre}
                  </h2>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-8 md:p-10">
                {/* Pills centradas */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  {animal.edad && (
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl px-7 py-5 text-center min-w-[140px]">
                      <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Edad</p>
                      <p className="text-2xl font-semibold text-slate-800">{animal.edad}</p>
                    </div>
                  )}
                  {animal.sexo && (
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl px-7 py-5 text-center min-w-[140px]">
                      <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Sexo</p>
                      <p className="text-2xl font-semibold text-slate-800">{animal.sexo}</p>
                    </div>
                  )}
                  {animal.tamaño && (
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl px-7 py-5 text-center min-w-[140px]">
                      <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Tamaño</p>
                      <p className="text-2xl font-semibold text-slate-800">{animal.tamaño}</p>
                    </div>
                  )}
                </div>

                {/* Descripción */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-slate-800 mb-5 text-center">
                    Sobre {animal.nombre}
                  </h3>
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-7">
                    <p className="text-slate-600 leading-relaxed text-[15.5px] text-center md:text-left">
                      {animal.descripcion}
                    </p>
                  </div>
                </div>

                {/* Sección de Adopción - Optimizada para celular */}
                <div className="bg-gradient-to-br from-[#588157] to-[#6e9b62] rounded-3xl p-6 md:p-9 text-center text-white mx-2 md:mx-0">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                    ¿Querés adoptar a {animal.nombre}?
                  </h3>
                  
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-white text-[#588157] px-8 md:px-10 py-4 rounded-2xl font-semibold text-base md:text-lg hover:bg-slate-100 active:scale-95 transition-all shadow-md w-full md:w-auto"
                  >
                    Solicitar adopción por WhatsApp
                  </a>
                </div>

                <p className="text-center text-xs text-slate-400 mt-8">
                  Gracias por considerar dar una segunda oportunidad ❤️
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(AnimalCard);