
import { useMemo, useState, useEffect, useRef, useId } from "react";
import { createPortal } from "react-dom";
import useAnimals from "../../hooks/useAnimals";
import AnimalCard from "./AnimalCard";
import AnimalSkeleton from "../ui/AnimalSkeleton";

import {
  Search,
  X,
  ClipboardCheck,
  Home,
  Syringe,
  Dog,
  Cat,
  PawPrint,
  HeartHandshake,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  SlidersHorizontal,
  Heart,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

/* =========================================
   CONFIGURACIÓN
========================================= */

const SIZES = ["Pequeño", "Mediano", "Grande"];

const REQUIREMENTS = [
  {
    icon: Home,
    title: "Un hogar seguro",
    description:
      "Un espacio protegido, con patio cerrado o las condiciones necesarias para garantizar su bienestar.",
  },
  {
    icon: Heart,
    title: "Amor y compromiso",
    description:
      "Brindar tiempo, atención, alimentación y cuidados durante toda su vida.",
  },
  {
    icon: Syringe,
    title: "Salud y prevención",
    description:
      "Mantener las vacunas al día y ofrecer atención veterinaria cuando la necesite.",
  },
  {
    icon: ShieldCheck,
    title: "Tenencia responsable",
    description:
      "Comprometerse con su seguridad, bienestar y castración a la edad correspondiente.",
  },
];

const VACCINES = [
  {
    icon: Dog,
    title: "Perros",
    description: "Vacuna séxtuple y antirrábica anual.",
  },
  {
    icon: Cat,
    title: "Gatos",
    description: "Triple felina y antirrábica anual.",
  },
  {
    icon: PawPrint,
    title: "Cachorros",
    description: "Vacunas adicionales según indicación veterinaria.",
  },
];

/* =========================================
   MODAL DE REQUISITOS
========================================= */

function Requirements() {
  const [isOpen, setIsOpen] = useState(false);

  const titleId = useId();
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const elements = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );

      if (!elements?.length) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      {/* BOTÓN DE REQUISITOS */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          group inline-flex min-h-[42px]
          items-center justify-center gap-2
          rounded-full border border-[#A3B18A]/45
          bg-[#F3F6EF]
          px-4 py-2.5
          text-[12px] font-semibold text-[#344E41]
          transition-all duration-300
          hover:border-[#588157]
          hover:bg-[#E9EFE4]
          active:scale-[0.98]
          sm:px-5 sm:text-[13px]
        "
      >
        <ClipboardCheck size={16} strokeWidth={1.8} />

        Requisitos para adoptar

        <ArrowUpRight
          size={14}
          className="
            transition-transform duration-300
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
          "
        />
      </button>

      {/* MODAL */}
      {isOpen &&
        createPortal(
          <div
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              bg-[#142219]/75
              p-2 backdrop-blur-sm
              sm:p-5
            "
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="
                flex w-full max-w-[780px]
                flex-col overflow-hidden
                rounded-[22px] bg-[#FDFEFC]
                shadow-[0_30px_100px_rgba(0,0,0,0.25)]
                sm:rounded-[28px]
              "
              style={{
                maxHeight: "calc(100dvh - 16px)",
              }}
            >
              {/* ENCABEZADO DEL MODAL */}
              <div
                className="
                  flex shrink-0 items-center
                  justify-between gap-3
                  border-b border-[#E8EDE5]
                  bg-white
                  px-5 py-4
                  sm:px-8 sm:py-6
                "
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-xl bg-[#E9EDC9]/70
                      text-[#588157]
                      sm:h-12 sm:w-12 sm:rounded-2xl
                    "
                  >
                    <HeartHandshake size={23} strokeWidth={1.6} />
                  </div>

                  <div className="min-w-0">
                    <h2
                      id={titleId}
                      className="
                        font-serif text-[22px]
                        font-semibold tracking-tight
                        text-[#344E41]
                        sm:text-[30px]
                      "
                    >
                      Guía de adopción
                    </h2>

                    <p className="mt-0.5 hidden text-[13px] text-[#829084] sm:block">
                      Todo lo que necesitás saber antes de adoptar
                    </p>
                  </div>
                </div>

                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar requisitos"
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full bg-[#F3F5F1]
                    text-[#526957]
                    transition-all hover:bg-[#E8EDE5]
                    active:scale-95
                    sm:h-10 sm:w-10
                  "
                >
                  <X size={19} />
                </button>
              </div>

              {/* CONTENIDO SCROLLABLE */}
              <div
                className="
                  min-h-0 flex-1
                  overflow-y-auto overscroll-contain
                  px-5 py-6
                  sm:px-9 sm:py-8
                "
              >
                <div className="mx-auto max-w-[680px]">

                  {/* INTRODUCCIÓN */}
                  <div className="mb-7 sm:mb-9">
                    <span
                      className="
                        mb-2 block text-[10px]
                        font-bold uppercase tracking-[0.18em]
                        text-[#849B76]
                      "
                    >
                      Adopción responsable
                    </span>

                    <h3
                      className="
                        mb-2 font-serif
                        text-[23px] font-semibold
                        leading-tight text-[#344E41]
                        sm:text-[29px]
                      "
                    >
                      Un compromiso para toda la vida.
                    </h3>

                    <p
                      className="
                        max-w-[550px]
                        text-[13px] leading-[1.8]
                        text-[#758078]
                        sm:text-[14px]
                      "
                    >
                      Adoptar significa ofrecer un hogar seguro,
                      cariño y cuidados. Estos son algunos de
                      los aspectos fundamentales que debemos considerar.
                    </p>
                  </div>

                  {/* REQUISITOS PRINCIPALES */}
                  <div className="mb-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {REQUIREMENTS.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="
                            flex items-start gap-3.5
                            rounded-[17px]
                            border border-[#E7ECE4]
                            bg-[#F7F9F5]
                            p-4 transition-colors
                            hover:bg-[#F0F5ED]
                            sm:p-5
                          "
                        >
                          <div
                            className="
                              flex h-10 w-10 shrink-0
                              items-center justify-center
                              rounded-xl bg-white
                              text-[#588157]
                              shadow-sm
                            "
                          >
                            <Icon size={20} strokeWidth={1.7} />
                          </div>

                          <div className="min-w-0">
                            <h4
                              className="
                                mb-1 text-[14px]
                                font-semibold text-[#344E41]
                              "
                            >
                              {item.title}
                            </h4>

                            <p
                              className="
                                text-[12px] leading-[1.7]
                                text-[#758078]
                                sm:text-[13px]
                              "
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CALENDARIO DE VACUNACIÓN */}
                  <section className="mb-9">
                    <div className="mb-4 flex items-center gap-2.5">
                      <div
                        className="
                          flex h-8 w-8
                          items-center justify-center
                          rounded-lg bg-[#E9EDC9]/70
                          text-[#588157]
                        "
                      >
                        <Syringe size={17} strokeWidth={1.7} />
                      </div>

                      <h3
                        className="
                          font-serif text-[22px]
                          font-semibold text-[#344E41]
                          sm:text-[25px]
                        "
                      >
                        Cuidado y vacunación
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {VACCINES.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.title}
                            className="
                              flex items-center gap-3
                              rounded-2xl
                              border border-[#E8EDE5]
                              bg-white p-3.5
                              sm:flex-col sm:items-center
                              sm:p-5 sm:text-center
                            "
                          >
                            <div
                              className="
                                flex h-10 w-10 shrink-0
                                items-center justify-center
                                rounded-xl bg-[#F1F5ED]
                                text-[#588157]
                                sm:mb-1 sm:h-11 sm:w-11
                              "
                            >
                              <Icon size={20} strokeWidth={1.7} />
                            </div>

                            <div>
                              <h4
                                className="
                                  mb-1 text-[13px] font-semibold
                                  text-[#344E41]
                                  sm:text-sm
                                "
                              >
                                {item.title}
                              </h4>

                              <p
                                className="
                                  text-[12px] leading-relaxed
                                  text-[#79857B]
                                "
                              >
                                {item.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* CASTRACIÓN */}
                  <section
                    className="
                      relative overflow-hidden
                      rounded-[22px]
                      bg-[#344E41]
                      px-5 py-6 text-white
                      sm:px-8 sm:py-8
                    "
                  >
                    <PawPrint
                      size={155}
                      strokeWidth={0.7}
                      className="
                        pointer-events-none absolute
                        -right-8 -bottom-8
                        rotate-[-18deg]
                        text-white/[0.06]
                      "
                    />

                    <div className="relative z-10">
                      <div className="mb-3 flex items-center gap-2">
                        <CheckCircle2
                          size={19}
                          className="text-[#DCE9CC]"
                        />

                        <h3
                          className="
                            font-serif text-[23px]
                            font-semibold
                            sm:text-[27px]
                          "
                        >
                          Castración responsable
                        </h3>
                      </div>

                      <p
                        className="
                          mb-5 max-w-[510px]
                          text-[13px] leading-[1.8]
                          text-white/80
                          sm:text-[14px]
                        "
                      >
                        Es indispensable asumir el compromiso
                        de realizar la castración a la edad
                        correspondiente, siguiendo la indicación
                        veterinaria.
                      </p>

                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {[
                          "Turnos en Veterinaria El Estribo, San Jorge o El Palenque.",
                          "Castraciones gratuitas para perros y gatos.",
                          "Disponibilidad en jornadas masivas.",
                        ].map((item) => (
                          <div
                            key={item}
                            className="
                              flex items-start gap-2.5
                              rounded-xl border border-white/10
                              bg-white/[0.07]
                              px-3.5 py-3
                            "
                          >
                            <CheckCircle2
                              size={16}
                              className="mt-0.5 shrink-0 text-[#DCE9CC]"
                            />

                            <span
                              className="
                                text-[12px] leading-relaxed
                                text-white/85
                              "
                            >
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <p
                    className="
                      mt-6 text-center
                      text-[12px] leading-relaxed
                      text-[#92A096]
                    "
                  >
                    Adoptar es un acto de amor y una responsabilidad
                    que dura toda la vida.
                  </p>
                </div>
              </div>

              {/* PIE DEL MODAL */}
              <div
                className="
                  flex shrink-0 items-center
                  justify-between gap-3
                  border-t border-[#E8EDE5]
                  bg-white
                  px-5 py-3
                  sm:px-9 sm:py-4
                "
              >
                <span
                  className="
                    hidden items-center gap-1.5
                    text-xs text-[#869487]
                    sm:inline-flex
                  "
                >
                  <Heart size={14} />
                  Gracias por adoptar responsablemente.
                </span>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="
                    flex w-full items-center
                    justify-center gap-2
                    rounded-xl bg-[#588157]
                    px-5 py-3
                    text-[13px] font-semibold text-white
                    transition-all
                    hover:bg-[#344E41]
                    active:scale-[0.98]
                    sm:ml-auto sm:w-auto sm:py-2.5
                  "
                >
                  Entendido
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

/* =========================================
   ESTADO VACÍO
========================================= */

function EmptyAnimals({ hasFilters, onReset }) {
  return (
    <div
      className="
        mx-auto flex max-w-md
        flex-col items-center
        rounded-[24px]
        border border-[#E6ECE3]
        bg-white px-6 py-10
        text-center shadow-sm
      "
    >
      <div
        className="
          mb-4 flex h-14 w-14
          items-center justify-center
          rounded-2xl bg-[#F0F5EB]
          text-[#588157]
        "
      >
        <PawPrint size={28} strokeWidth={1.5} />
      </div>

      <h3
        className="
          mb-2 font-serif text-[23px]
          font-semibold text-[#344E41]
        "
      >
        {hasFilters
          ? "No encontramos resultados"
          : "Todavía no hay animalitos"}
      </h3>

      <p
        className="
          mb-5 text-[13px] leading-relaxed
          text-[#849087]
        "
      >
        {hasFilters
          ? "Probá con otro nombre o cambiá los filtros para encontrar a tu próximo compañero."
          : "Pronto vas a poder conocer a los animalitos que buscan un hogar."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="
            inline-flex items-center gap-2
            rounded-xl bg-[#588157]
            px-5 py-2.5
            text-[13px] font-semibold text-white
            transition-colors hover:bg-[#344E41]
          "
        >
          <X size={15} />
          Limpiar filtros
        </button>
      )}
    </div>
  );
}

/* =========================================
   COMPONENTE PRINCIPAL
========================================= */

export default function Animals() {
  const { animals, loading } = useAnimals();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSize, setFilterSize] = useState(null);

  const safeAnimals = Array.isArray(animals) ? animals : [];

  const filteredAnimals = useMemo(() => {
    const search = searchTerm.trim().toLocaleLowerCase("es-AR");

    return safeAnimals.filter((animal) => {
      const name = String(animal.nombre || "")
        .toLocaleLowerCase("es-AR");

      const matchesSearch = name.includes(search);

      const matchesSize =
        filterSize === null ||
        animal.tamaño === filterSize;

      return matchesSearch && matchesSize;
    });
  }, [safeAnimals, searchTerm, filterSize]);

  const hasFilters = Boolean(searchTerm.trim() || filterSize);

  const resetFilters = () => {
    setSearchTerm("");
    setFilterSize(null);
  };

  const toggleSize = (size) => {
    setFilterSize((current) =>
      current === size ? null : size
    );
  };

  return (
    <section
      id="animals"
      aria-labelledby="animals-title"
      className="
        relative overflow-hidden
        bg-[#FAFBF8]
        py-12 sm:py-16 lg:py-24
      "
    >
      {/* DECORACIÓN DEL FONDO */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-24 top-0
          h-80 w-80 rounded-full
          bg-[#E9EDC9]/25 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-24 bottom-0
          h-72 w-72 rounded-full
          bg-[#A3B18A]/10 blur-3xl
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =============================
            ENCABEZADO
        ============================= */}
        <header className="mx-auto mb-8 max-w-[720px] text-center sm:mb-11">

          <div
            className="
              mb-4 inline-flex
              items-center gap-2
              rounded-full
              border border-[#DDE8D7]
              bg-white px-3.5 py-1.5
              text-[10px] font-semibold
              uppercase tracking-[0.16em]
              text-[#588157]
              sm:text-[11px]
            "
          >
            <PawPrint size={13} />
            Adopciones responsables
          </div>

          <h2
            id="animals-title"
            className="
              mb-4 font-serif
              text-[34px] font-semibold
              leading-[1.12] tracking-tight
              text-[#344E41]
              sm:text-[45px]
              lg:text-[55px]
            "
          >
            Ellos esperan por vos
            <span className="text-[#A3B18A]">.</span>
          </h2>

          <p
            className="
              mx-auto max-w-[490px]
              text-[13px] leading-[1.8]
              text-[#7B897E]
              sm:text-[15px]
            "
          >
            Cada uno tiene una historia especial y mucho amor
            para dar. Conocelos y encontrá a quien puede
            convertirse en tu próximo compañero.
          </p>
        </header>

        {/* =============================
            BUSCADOR Y FILTROS
        ============================= */}
        <div
          className="
            mx-auto mb-9 max-w-[940px]
            rounded-[22px]
            border border-[#E8EDE5]
            bg-white p-4
            shadow-[0_6px_30px_rgba(52,78,65,0.045)]
            sm:mb-11 sm:rounded-[25px] sm:p-5
          "
        >
          {/* BUSCADOR */}
          <div className="relative mx-auto mb-4 max-w-[600px]">
            <Search
              size={19}
              strokeWidth={1.8}
              className="
                pointer-events-none absolute
                left-4 top-1/2
                -translate-y-1/2
                text-[#91A093]
              "
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="¿A quién estás buscando?"
              aria-label="Buscar animales por nombre"
              className="
                h-[49px] w-full
                rounded-[14px]
                border border-[#E3EAE0]
                bg-[#F8FAF7]
                pl-11 pr-10
                text-[13px] text-[#344E41]
                outline-none
                transition-all duration-200
                placeholder:text-[#9BA89E]
                focus:border-[#A3B18A]
                focus:bg-white
                focus:ring-4 focus:ring-[#A3B18A]/10
                sm:h-[53px] sm:text-[14px]
              "
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Borrar búsqueda"
                className="
                  absolute right-3 top-1/2
                  flex h-7 w-7
                  -translate-y-1/2
                  items-center justify-center
                  rounded-full text-[#91A093]
                  transition-colors
                  hover:bg-[#E8EEE5]
                  hover:text-[#344E41]
                "
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* SEPARADOR */}
          <div className="mb-4 h-px bg-[#EDF0EA]" />

          {/* FILTROS */}
          <div
            className="
              flex flex-col items-center
              justify-between gap-4
              sm:flex-row
            "
          >
            <div
              className="
                flex flex-wrap items-center
                justify-center gap-2
                sm:justify-start
              "
            >
              <span
                className="
                  mr-1 hidden items-center gap-1.5
                  text-[12px] font-medium
                  text-[#829084]
                  md:inline-flex
                "
              >
                <SlidersHorizontal size={15} />
                Tamaño
              </span>

              <button
                type="button"
                aria-pressed={filterSize === null}
                onClick={() => setFilterSize(null)}
                className={`
                  min-h-[38px] rounded-full border
                  px-3.5 py-2
                  text-[11px] font-semibold
                  transition-all duration-200
                  sm:px-4 sm:text-xs
                  ${
                    filterSize === null
                      ? "border-[#588157] bg-[#588157] text-white shadow-sm"
                      : "border-[#E2E8DE] bg-white text-[#6F7F72] hover:border-[#A3B18A]"
                  }
                `}
              >
                Todos
              </button>

              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  aria-pressed={filterSize === size}
                  onClick={() => toggleSize(size)}
                  className={`
                    min-h-[38px] rounded-full border
                    px-3.5 py-2
                    text-[11px] font-semibold
                    transition-all duration-200
                    sm:px-4 sm:text-xs
                    ${
                      filterSize === size
                        ? "border-[#588157] bg-[#588157] text-white shadow-sm"
                        : "border-[#E2E8DE] bg-white text-[#6F7F72] hover:border-[#A3B18A]"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>

            <Requirements />
          </div>
        </div>

        {/* =============================
            CABECERA DE RESULTADOS
        ============================= */}
        <div
          className="
            mb-5 flex items-end
            justify-between gap-3
            sm:mb-6
          "
        >
          <div>
            <h3
              className="
                font-serif text-[22px]
                font-semibold text-[#344E41]
                sm:text-[27px]
              "
            >
              Conocé a nuestros peluditos
            </h3>

            <p
              aria-live="polite"
              className="
                mt-1 text-[12px]
                text-[#8A978D]
                sm:text-[13px]
              "
            >
              {loading
                ? "Buscando compañeros..."
                : filteredAnimals.length === 1
                ? "1 compañero para conocer"
                : `${filteredAnimals.length} compañeros para conocer`}
            </p>
          </div>

          {/* INDICADOR MÓVIL */}
          {!loading && filteredAnimals.length > 0 && (
            <div
              className="
                flex shrink-0 items-center gap-1
                pb-1 text-[10px]
                font-medium text-[#86978A]
                md:hidden
              "
            >
              Deslizá
              <ArrowRight size={15} />
            </div>
          )}
        </div>

        {/* =============================
            SIN RESULTADOS
        ============================= */}
        {!loading && filteredAnimals.length === 0 ? (
          <EmptyAnimals
            hasFilters={hasFilters}
            onReset={resetFilters}
          />
        ) : (
          <>
            {/* =============================
                CELULARES
                CARRUSEL DE DOS FILAS
            ============================= */}
            <div
              className="
                -mx-4 w-[calc(100%+2rem)]
                overflow-x-auto overscroll-x-contain
                scroll-smooth
                pb-5 pl-4 pr-4
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
                md:hidden
              "
              aria-label="Listado de animales"
            >
              <div
                className="
                  grid w-max
                  grid-flow-col grid-rows-2
                  gap-3.5
                  pb-2
                "
              >
                {loading
                  ? Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="w-[175px] min-[390px]:w-[185px]"
                      >
                        <AnimalSkeleton />
                      </div>
                    ))
                  : filteredAnimals.map((animal, index) => (
                      <div
                        key={animal.id ?? index}
                        className="w-[175px] min-[390px]:w-[185px]"
                      >
                        <AnimalCard animal={animal} />
                      </div>
                    ))}
              </div>
            </div>

            {/* =============================
                TABLET Y COMPUTADORA
                GRID RESPONSIVE
            ============================= */}
            <div
              className="
                hidden gap-5
                md:grid md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                xl:gap-6
              "
            >
              {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <AnimalSkeleton key={index} />
                  ))
                : filteredAnimals.map((animal, index) => (
                    <AnimalCard
                      key={animal.id ?? index}
                      animal={animal}
                    />
                  ))}
            </div>
          </>
        )}

        {/* =============================
            MENSAJE INFERIOR
        ============================= */}
        {!loading && filteredAnimals.length > 0 && (
          <div
            className="
              mt-8 flex flex-col items-center
              gap-2 text-center
              sm:mt-12
            "
          >
            <div
              className="
                mb-1 flex h-9 w-9
                items-center justify-center
                rounded-full bg-[#E9EDC9]/60
                text-[#588157]
              "
            >
              <Heart size={17} strokeWidth={1.7} />
            </div>

            <p
              className="
                font-serif text-[19px]
                font-medium text-[#344E41]
                sm:text-[22px]
              "
            >
              Un hogar puede cambiarlo todo.
            </p>

            <p
              className="
                max-w-[420px]
                text-[12px] leading-relaxed
                text-[#92A096]
                sm:text-[13px]
              "
            >
              Gracias por considerar la adopción y darle
              una nueva oportunidad a quien más lo necesita.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
