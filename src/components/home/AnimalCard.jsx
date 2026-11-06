import { memo, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  PawPrint,
  CalendarDays,
  Ruler,
  VenusAndMars,
  MessageCircle,
  X,
  CheckCircle2,
  Heart,
} from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80";

function AnimalCard({ animal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const titleId = useId();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const openButtonRef = useRef(null);

  const nombre = animal?.nombre || "Sin nombre";
  const descripcion =
    animal?.descripcion ||
    "Muy pronto compartiremos más información sobre este animalito.";

  const currentImage =
    animal?.imagenURL ||
    animal?.imagen ||
    animal?.foto ||
    FALLBACK_IMAGE;

  const whatsappLink = `https://wa.me/5493471347911?text=${encodeURIComponent(
    `Hola, me interesa adoptar a "${nombre}"\n\n` +
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

  const characteristics = [
    {
      label: "Edad",
      value: animal?.edad,
      icon: CalendarDays,
    },
    {
      label: "Sexo",
      value: animal?.sexo,
      icon: VenusAndMars,
    },
    {
      label: "Tamaño",
      value: animal?.tamaño,
      icon: Ruler,
    },
  ].filter((item) => item.value);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }

      if (event.key === "Tab") {
        const focusableElements = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements?.length) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      openButtonRef.current?.focus();
    };
  }, [isModalOpen]);

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <>
      {/* CARD */}
      <article
        className="
          group relative flex h-full min-w-0 flex-col overflow-hidden
          rounded-[22px] border border-[#E4E9E1] bg-white
          shadow-[0_4px_20px_rgba(52,78,65,0.05)]
          transition-all duration-300
          hover:-translate-y-1 hover:border-[#A3B18A]/70
          hover:shadow-[0_14px_38px_rgba(52,78,65,0.12)]
        "
      >
        {/* Imagen */}
        <div className="relative aspect-[4/4.15] w-full overflow-hidden bg-[#E8EEE5] sm:aspect-[4/3.75]">
          <img
            src={currentImage}
            alt={`Foto de ${nombre}`}
            loading="lazy"
            onError={handleImageError}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1E3326]/35 via-transparent to-transparent" />

          {animal?.edad && (
            <div
              className="
                absolute bottom-3 left-3 rounded-full bg-[#344E41]/85
                px-3 py-1.5 text-[11px] font-medium text-white
                backdrop-blur-md sm:bottom-4 sm:left-4 sm:text-xs
              "
            >
              {animal.edad}
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="flex flex-1 flex-col p-3.5 sm:p-5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3
              className="
                min-w-0 break-words font-serif text-[21px] font-semibold
                leading-tight tracking-tight text-[#344E41] sm:text-[27px]
              "
            >
              {nombre}
            </h3>

            <PawPrint
              size={19}
              strokeWidth={1.6}
              className="mt-1 hidden shrink-0 text-[#A3B18A] sm:block"
            />
          </div>

          <p
            className="
              mb-4 line-clamp-3 flex-1 text-[12px] leading-relaxed
              text-[#758078] sm:text-[14px]
            "
          >
            {descripcion}
          </p>

          {(animal?.sexo || animal?.tamaño) && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {animal?.sexo && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-[#F3F5EF] px-2 py-1 text-[10px] font-medium text-[#58705B] sm:px-2.5 sm:py-1.5 sm:text-xs">
                  <VenusAndMars size={12} />
                  {animal.sexo}
                </span>
              )}

              {animal?.tamaño && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-[#F3F5EF] px-2 py-1 text-[10px] font-medium text-[#58705B] sm:px-2.5 sm:py-1.5 sm:text-xs">
                  <Ruler size={12} />
                  {animal.tamaño}
                </span>
              )}
            </div>
          )}

          <div className="mb-3.5 h-px bg-[#E9EDE6]" />

          <button
            ref={openButtonRef}
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="
              group/btn mt-auto flex w-full items-center justify-center gap-2
              rounded-xl bg-[#588157] px-3 py-3 text-[12px] font-semibold text-white
              transition-all duration-300 hover:bg-[#344E41] active:scale-[0.98]
              sm:rounded-2xl sm:py-3.5 sm:text-sm
            "
          >
            Conocer más
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </button>
        </div>
      </article>

      {/* MODAL */}
      {isModalOpen &&
        createPortal(
          <div
            className="
              fixed inset-0 z-[9999] flex items-center justify-center
              bg-[#142219]/75 p-2 backdrop-blur-[5px] sm:p-5
            "
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsModalOpen(false);
              }
            }}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="
                relative flex w-full max-w-[760px] flex-col overflow-hidden
                rounded-[22px] bg-[#FDFEFC]
                shadow-[0_25px_90px_rgba(0,0,0,0.25)]
                sm:rounded-[28px]
              "
              style={{ maxHeight: "calc(100dvh - 16px)" }}
            >
              {/* Botón cerrar */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar detalles"
                className="
                  absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center
                  rounded-full bg-white/95 text-[#344E41] shadow-md transition-all
                  hover:bg-white hover:scale-105 active:scale-95
                  sm:right-5 sm:top-5 sm:h-10 sm:w-10
                "
              >
                <X size={19} />
              </button>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                {/* Hero de imagen */}
                <div
                  className="
                    relative flex w-full items-center justify-center overflow-hidden
                    bg-[#DCE5D8]
                    h-[210px]
                    min-[390px]:h-[240px]
                    sm:h-[300px]
                    md:h-[340px]
                  "
                >
                  {/* Fondo blur */}
                  <div
                    className="absolute inset-0 scale-110 bg-cover bg-center opacity-70 blur-3xl"
                    style={{ backgroundImage: `url("${currentImage}")` }}
                  />
                  <div className="absolute inset-0 bg-[#17251C]/15" />

                  {/* Imagen completa sin deformar */}
                  <div className="relative z-10 flex h-full w-full items-center justify-center px-2 sm:px-4">
                    <img
                      src={currentImage}
                      alt={nombre}
                      onError={handleImageError}
                      className="
                        h-full max-h-full w-auto max-w-full object-contain
                      "
                    />
                  </div>

                  {/* Gradiente inferior */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-[#17251C]/90 via-[#17251C]/35 to-transparent" />

                  {/* Nombre */}
                  <div className="absolute bottom-4 left-5 right-5 z-20 sm:bottom-7 sm:left-9">
                    <h2
                      id={titleId}
                      className="
                        break-words font-serif text-[31px] font-semibold
                        leading-tight tracking-tight text-white sm:text-[42px]
                      "
                    >
                      {nombre}
                    </h2>
                  </div>
                </div>

                {/* Contenido */}
                <div className="px-4 pb-7 pt-5 sm:px-9 sm:pb-9 sm:pt-8">
                  {/* Características centradas */}
                  {characteristics.length > 0 && (
                    <div
                      className="
                        mx-auto mb-6 flex w-full max-w-[560px] flex-wrap
                        items-stretch justify-center gap-2.5 sm:mb-9 sm:gap-3
                      "
                    >
                      {characteristics.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.label}
                            className="
                              flex min-w-0 basis-[calc(50%-5px)] flex-col items-center
                              justify-center rounded-[15px] border border-[#E5EBE2]
                              bg-[#F5F8F3] px-2 py-3 text-center
                              sm:basis-[165px] sm:rounded-[18px] sm:px-4 sm:py-5
                            "
                          >
                            <div
                              className="
                                mb-1.5 flex h-8 w-8 items-center justify-center
                                rounded-[10px] bg-white text-[#588157]
                                shadow-[0_2px_6px_rgba(52,78,65,0.06)]
                                sm:mb-2.5 sm:h-10 sm:w-10
                              "
                            >
                              <Icon size={17} strokeWidth={1.7} />
                            </div>

                            <span
                              className="
                                mb-1 text-[9px] font-semibold uppercase
                                tracking-[0.12em] text-[#89998C] sm:text-[10px]
                              "
                            >
                              {item.label}
                            </span>

                            <span
                              className="
                                max-w-full break-words text-[12px] font-semibold
                                leading-snug text-[#344E41] sm:text-[14px]
                              "
                            >
                              {item.value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Descripción */}
                  <section className="mx-auto mb-6 max-w-[590px] sm:mb-8">
                    <div className="mb-3 flex items-center gap-2.5 sm:mb-4 sm:gap-3">
                      <div
                        className="
                          flex h-8 w-8 shrink-0 items-center justify-center
                          rounded-[10px] bg-[#E9EDC9]/65 text-[#588157]
                          sm:h-9 sm:w-9
                        "
                      >
                        <PawPrint size={17} strokeWidth={1.8} />
                      </div>

                      <h3
                        className="
                          font-serif text-[21px] font-semibold leading-tight
                          tracking-tight text-[#344E41] sm:text-[26px]
                        "
                      >
                        Conocé a {nombre}
                      </h3>
                    </div>

                    <p
                      className="
                        whitespace-pre-line text-[13px] leading-[1.8]
                        text-[#657369] sm:text-[15px] sm:leading-[1.9]
                      "
                    >
                      {descripcion}
                    </p>
                  </section>

                  <div className="mx-auto mb-6 h-px max-w-[590px] bg-[#E6EBE2] sm:mb-8" />

                  {/* Sección adopción */}
                  <section
                    className="
                      relative mx-auto max-w-[590px] overflow-hidden rounded-[20px]
                      bg-[#344E41] px-5 py-7 text-center text-white
                      sm:rounded-[24px] sm:px-9 sm:py-9
                    "
                  >
                    <PawPrint
                      size={140}
                      strokeWidth={0.7}
                      className="pointer-events-none absolute -right-8 -top-8 rotate-[-20deg] text-white/[0.05]"
                    />

                    <div className="relative z-10">
                      <div
                        className="
                          mx-auto mb-3 flex h-10 w-10 items-center justify-center
                          rounded-xl border border-white/15 bg-white/10
                          sm:mb-4 sm:h-12 sm:w-12
                        "
                      >
                        <Heart size={21} className="text-[#E9EDC9]" />
                      </div>

                      <h3
                        className="
                          mb-2 font-serif text-[23px] font-semibold leading-tight
                          tracking-tight sm:text-[30px]
                        "
                      >
                        ¿Querés darle un hogar?
                      </h3>

                      <p
                        className="
                          mx-auto mb-5 max-w-[390px] text-[12px] leading-relaxed
                          text-white/75 sm:mb-6 sm:text-sm
                        "
                      >
                        {nombre} está esperando una familia. Una adopción puede
                        cambiar su vida para siempre.
                      </p>

                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex w-full items-center justify-center gap-2
                          rounded-xl bg-white px-5 py-3.5 text-[12px] font-semibold
                          text-[#344E41] shadow-md transition-all duration-300
                          hover:bg-[#E9EDC9] active:scale-[0.98]
                          sm:w-auto sm:rounded-2xl sm:px-8 sm:py-4 sm:text-sm
                        "
                      >
                        <MessageCircle size={18} />
                        Solicitar adopción
                        <ArrowUpRight size={16} />
                      </a>

                      <div
                        className="
                          mt-4 flex items-center justify-center gap-1.5
                          text-[10px] text-white/60 sm:text-[11px]
                        "
                      >
                        <CheckCircle2 size={13} />
                        Adopción responsable
                      </div>
                    </div>
                  </section>

                  <p
                    className="
                      mt-5 text-center text-[11px] leading-relaxed text-[#98A49A]
                      sm:mt-7 sm:text-xs
                    "
                  >
                    Cada adopción es una nueva oportunidad.
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default memo(AnimalCard);