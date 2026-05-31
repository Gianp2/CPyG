import { memo, useState, useEffect } from "react";

const getStatusStyles = (status) => {
  switch (status) {
    case "En adopción":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "Adoptado":
      return "bg-slate-100 text-slate-500 border border-slate-200";
    default:
      return "bg-[#E9EDC9] text-[#588157] border border-[#CCD5AE]";
  }
};

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
    `Hola, me interesa adoptar a ${animal.nombre}.`
  )}`;

  return (
    <>
      {/* CARD */}
      <article className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col h-full">
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img
            src={currentImage}
            alt={animal.nombre}
            loading="lazy"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-semibold ${getStatusStyles(
                animal.estado
              )}`}
            >
              {animal.estado}
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {animal.nombre}
          </h3>

          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-5">
            {animal.descripcion}
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-auto w-full bg-[#588157] hover:bg-[#4A6D49] text-white py-3 rounded-xl font-medium transition-colors"
          >
            Conocer más
          </button>
        </div>
      </article>

      {/* MODAL */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-full max-w-3xl rounded-[32px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          >
            {/* BOTÓN CERRAR - Mejorado */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-30 w-11 h-11 rounded-2xl bg-white shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:scale-110 transition-all duration-200 hover:shadow-xl border border-slate-100"
            >
              <span className="text-2xl leading-none font-light">×</span>
            </button>

            {/* SCROLL INTERNO */}
            <div className="overflow-y-auto">
              {/* IMAGEN */}
              <div className="relative overflow-hidden bg-slate-100">
                {/* Fondo borroso */}
                <div className="absolute inset-0">
                  <img
                    src={currentImage}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover scale-125 blur-3xl opacity-60"
                  />
                </div>

                {/* Capa para suavizar el desenfoque */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Imagen principal */}
                <div className="relative flex items-center justify-center p-8 min-h-[400px]">
                  <img
                    src={currentImage}
                    alt={animal.nombre}
                    className="max-w-full max-h-[500px] object-contain rounded-2xl shadow-xl"
                  />
                </div>

                {/* Información */}
                <div className="absolute bottom-6 left-6 z-10">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${getStatusStyles(
                      animal.estado
                    )}`}
                  >
                    {animal.estado}
                  </span>

                  <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                    {animal.nombre}
                  </h2>
                </div>
              </div>

              {/* CONTENIDO */}
              <div className="p-8">
                {/* DATOS */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {animal.edad && (
                    <div className="w-full md:w-56 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                      <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">
                        Edad
                      </p>
                      <p className="font-semibold text-slate-800 text-lg">
                        {animal.edad}
                      </p>
                    </div>
                  )}

                  {animal.sexo && (
                    <div className="w-full md:w-56 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                      <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">
                        Sexo
                      </p>
                      <p className="font-semibold text-slate-800 text-lg">
                        {animal.sexo}
                      </p>
                    </div>
                  )}

                  {animal.tamaño && (
                    <div className="w-full md:w-56 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                      <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">
                        Tamaño
                      </p>
                      <p className="font-semibold text-slate-800 text-lg">
                        {animal.tamaño}
                      </p>
                    </div>
                  )}
                </div>

                {/* DESCRIPCIÓN */}
                <div className="mb-8 text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    Información
                  </h3>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                      {animal.descripcion}
                    </p>
                  </div>
                </div>

                {/* ADOPCIÓN */}
                <div className="rounded-3xl bg-gradient-to-r from-[#588157] to-[#6E9B62] p-8">
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-3xl font-bold text-white mb-6">
                      ¿Te gustaría adoptar a {animal.nombre}?
                    </h3>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-white text-[#588157] px-10 py-4 rounded-2xl font-semibold hover:bg-slate-100 transition-colors duration-300"
                    >
                      Solicitar adopción
                    </a>
                  </div>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6">
                  Gracias por brindar una segunda oportunidad.
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