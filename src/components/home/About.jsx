
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Scissors,
  Activity,
  Sparkles,
  Building2,
  Syringe,
  ArrowLeft,
  ArrowRight,
  Phone,
  PawPrint,
} from "lucide-react";

/* ===============================
   INFORMACIÓN GENERAL
================================ */

const ACTIONS = [
  {
    icon: Search,
    title: "Rescatar y Proteger",
    desc: "Los 365 días del año rescatamos animales en situación de abandono (cunetas, campos, basurales y zonas urbanas), madres con crías o casos críticos.",
  },
  {
    icon: Scissors,
    title: "Castrar",
    desc: "Creemos en cortar el problema de raíz. Participamos en 5 campañas masivas anuales y gestionamos turnos gratuitos en veterinarias locales.",
  },
  {
    icon: Activity,
    title: "Sanar",
    desc: "Brindamos primeros auxilios y atención veterinaria a animales heridos, enfermos o en estado crítico, asumiendo su rehabilitación.",
  },
  {
    icon: Sparkles,
    title: "Adoptar Responsablemente",
    desc: "Registramos cada adopción bajo compromiso de castración obligatoria para garantizar un futuro seguro y feliz.",
  },
];

const ABOUT_IMAGES = [
  { url: "nosotros.jpeg", alt: "Voluntarios trabajando en Armstrong" },
  { url: "nosotros1.jpeg", alt: "Rescatados de la agrupación" },
  { url: "nosotros6.jpeg", alt: "Labor comunitaria en Armstrong" },
  { url: "nosotros2.jpeg", alt: "Labor comunitaria en Armstrong" },
  { url: "nosotros5.jpeg", alt: "Labor comunitaria en Armstrong" },
  { url: "nosotros7.jpeg", alt: "Labor comunitaria en Armstrong" },
];

const MASS_CONTACTS = [
  { name: "Eli", number: "3471 62-8767", phone: "3471628767" },
  { name: "Vicky", number: "3471 59-4581", phone: "3471594581" },
];

const VET_CONTACTS = [
  { name: "El Estribo (Eli)", number: "3471 62-8767", phone: "3471628767" },
  { name: "San Jorge (Agus)", number: "3471 57-0085", phone: "3471570085" },
  { name: "El Palenque (Luci)", number: "3471 34-7911", phone: "3471347911" },
  { name: "El Palenque (Luchi)", number: "3471 67-3977", phone: "3471673977" },
];

/* ===============================
   FILAS DE CONTACTO
================================ */

function ContactList({ title, contacts }) {
  return (
    <div className="w-full">
      <h5 className="mb-3 text-center text-[12px] font-semibold text-[#344E41] sm:text-[13px]">
        {title}
      </h5>

      <div className="space-y-2">
        {contacts.map((contact) => (
          <div
            key={`${contact.name}-${contact.phone}`}
            className="
              flex min-w-0 flex-wrap items-center
              justify-between gap-x-3 gap-y-1.5
              rounded-xl bg-[#F6F8F5]
              px-3.5 py-3
              transition-colors hover:bg-[#EEF3EC]
              sm:px-4
            "
          >
            <span className="min-w-0 text-[11px] font-medium text-[#617265] sm:text-xs">
              {contact.name}
            </span>

            <a
              href={`tel:${contact.phone}`}
              aria-label={`Llamar a ${contact.name} al ${contact.number}`}
              className="
                inline-flex shrink-0 items-center gap-1.5
                text-[11px] font-semibold text-[#588157]
                transition-colors hover:text-[#344E41]
                sm:text-xs
              "
            >
              <Phone size={12} strokeWidth={1.8} />
              {contact.number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===============================
   TARJETA DE CAMPAÑAS
================================ */

function MassCampaigns() {
  return (
    <div className="flex h-full min-w-0 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div
          className="
            mb-3 flex h-11 w-11 items-center justify-center
            rounded-2xl bg-[#F0F5EB] text-[#588157]
          "
        >
          <Building2 size={21} strokeWidth={1.7} />
        </div>

        <h4
          className="
            mb-3 max-w-[270px] font-serif
            text-[21px] font-semibold leading-tight
            text-[#344E41] sm:text-[24px]
          "
        >
          Campañas de Castración Masivas
        </h4>

        <p className="max-w-[360px] text-[12px] leading-[1.8] text-[#728176] sm:text-[13px]">
          Colaboramos activamente en{" "}
          <strong className="font-semibold text-[#344E41]">
            5 campañas de castración masiva al año
          </strong>{" "}
          coordinadas junto a la Municipalidad de Armstrong,
          garantizando el acceso gratuito para toda la comunidad.
        </p>
      </div>

      <div className="mt-auto pt-6">
        <div className="mb-5 h-px w-full bg-[#E8EDE5]" />

        <ContactList
          title="Contactos para campañas masivas"
          contacts={MASS_CONTACTS}
        />
      </div>
    </div>
  );
}

/* ===============================
   TARJETA DE VETERINARIAS
================================ */

function VeterinaryAppointments() {
  return (
    <div className="flex h-full min-w-0 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div
          className="
            mb-3 flex h-11 w-11 items-center justify-center
            rounded-2xl bg-[#F0F5EB] text-[#588157]
          "
        >
          <Syringe size={21} strokeWidth={1.7} />
        </div>

        <h4
          className="
            mb-3 font-serif text-[21px]
            font-semibold leading-tight
            text-[#344E41] sm:text-[24px]
          "
        >
          Turnos en Veterinarias
        </h4>

        <p className="max-w-[360px] text-[12px] leading-[1.8] text-[#728176] sm:text-[13px]">
          Gestionamos{" "}
          <strong className="font-semibold text-[#344E41]">
            30 turnos mensuales gratuitos
          </strong>{" "}
          otorgados por el municipio en las veterinarias
          aliadas de la ciudad.
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {["El Estribo", "San Jorge", "El Palenque"].map((vet) => (
            <span
              key={vet}
              className="
                rounded-lg border border-[#E8EDE5]
                bg-[#F6F8F5] px-2.5 py-1.5
                text-[10px] font-medium text-[#657969]
              "
            >
              {vet}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <div className="mb-5 h-px w-full bg-[#E8EDE5]" />

        <ContactList
          title="Contactos para solicitar turnos"
          contacts={VET_CONTACTS}
        />
      </div>
    </div>
  );
}

/* ===============================
   SECCIÓN DE SALUD PÚBLICA
================================ */

function PublicHealth() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="
        relative mx-auto max-w-[1100px]
        overflow-hidden rounded-[24px]
        border border-[#E3E9D9]
        bg-[#F3F5E8]
        px-3 py-8
        sm:rounded-[30px] sm:px-7 sm:py-11
        lg:px-12 lg:py-14
      "
    >
      {/* ENCABEZADO */}
      <div className="mx-auto mb-7 max-w-[650px] text-center sm:mb-10">
        <div className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#588157] sm:text-[11px]">
          <PawPrint size={14} />
          Salud pública y prevención
        </div>

        <h3
          className="
            mx-auto mb-4 max-w-[560px]
            font-serif text-[27px] font-semibold
            leading-[1.2] tracking-tight
            text-[#344E41]
            sm:text-[36px]
            lg:text-[40px]
          "
        >
          Trabajo en castraciones y concientización
        </h3>

        <p
          className="
            mx-auto max-w-[560px]
            text-[12px] leading-[1.85]
            text-[#6E806F]
            sm:text-[14px]
          "
        >
          Apostamos fuerte a la castración masiva como
          la herramienta más efectiva para reducir el
          abandono. No solo actuamos ante la emergencia,
          también educamos y prevenimos.
        </p>
      </div>

      {/* =================================
          CELULAR:
          BLOQUE ÚNICO CON DIVISIÓN
          DESKTOP:
          DOS TARJETAS INDEPENDIENTES
      ================================= */}

      <div
        className="
          mx-auto grid max-w-[950px]
          grid-cols-1 overflow-hidden
          rounded-[22px] border border-[#E5EBDD]
          bg-white shadow-[0_8px_30px_rgba(52,78,65,0.045)]
          md:grid-cols-2 md:gap-5
          md:overflow-visible md:border-0
          md:bg-transparent md:shadow-none
        "
      >
        {/* CAMPAÑAS */}
        <div
          className="
            min-w-0
            md:overflow-hidden md:rounded-[22px]
            md:border md:border-[#E5EBDD]
            md:bg-white
            md:shadow-[0_6px_24px_rgba(52,78,65,0.04)]
          "
        >
          <MassCampaigns />
        </div>

        {/* SEPARADOR MÓVIL */}
        <div className="mx-5 h-px bg-[#E8EDE5] md:hidden" />

        {/* VETERINARIAS */}
        <div
          className="
            min-w-0
            md:overflow-hidden md:rounded-[22px]
            md:border md:border-[#E5EBDD]
            md:bg-white
            md:shadow-[0_6px_24px_rgba(52,78,65,0.04)]
          "
        >
          <VeterinaryAppointments />
        </div>
      </div>
    </motion.div>
  );
}

/* ===============================
   COMPONENTE PRINCIPAL
================================ */

export default function About() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const nextSlide = () => {
    setActiveSlide((previous) =>
      (previous + 1) % ABOUT_IMAGES.length
    );
  };

  const prevSlide = () => {
    setActiveSlide((previous) =>
      (previous - 1 + ABOUT_IMAGES.length) %
      ABOUT_IMAGES.length
    );
  };

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX;
    touchEnd.current = null;
  };

  const onTouchMove = (event) => {
    touchEnd.current = event.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (
      touchStart.current === null ||
      touchEnd.current === null
    ) {
      touchStart.current = null;
      touchEnd.current = null;
      return;
    }

    const distance =
      touchStart.current - touchEnd.current;

    if (Math.abs(distance) > 50) {
      if (distance > 0) nextSlide();
      else prevSlide();
    }

    touchStart.current = null;
    touchEnd.current = null;
  };

  return (
    <section
      id="about"
      className="
        w-full overflow-x-hidden
        bg-transparent
        py-12 sm:py-16 lg:py-20
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* =============================
            PRESENTACIÓN
        ============================= */}
        <div
          className="
            mb-16 grid grid-cols-1
            items-center gap-10
            lg:mb-24 lg:grid-cols-2 lg:gap-14
          "
        >
          {/* CARRUSEL */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative min-w-0"
          >
            <div
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="
                group relative h-[310px]
                w-full select-none overflow-hidden
                rounded-[22px]
                bg-[#E9EEE6]
                shadow-[0_12px_40px_rgba(52,78,65,0.1)]
                touch-pan-y
                sm:h-[400px]
                lg:h-[440px]
              "
            >
              {ABOUT_IMAGES.map((img, index) => (
                <div
                  key={img.url}
                  className={`
                    absolute inset-0
                    transition-opacity duration-700
                    ${
                      index === activeSlide
                        ? "z-10 opacity-100"
                        : "pointer-events-none z-0 opacity-0"
                    }
                  `}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}

              {/* NAVEGACIÓN PC */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Imagen anterior"
                className="
                  absolute left-4 top-1/2 z-20
                  hidden h-10 w-10
                  -translate-y-1/2
                  items-center justify-center
                  rounded-full bg-white/90
                  text-[#344E41] shadow-md
                  transition-all hover:bg-white
                  md:flex
                "
              >
                <ArrowLeft size={19} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Imagen siguiente"
                className="
                  absolute right-4 top-1/2 z-20
                  hidden h-10 w-10
                  -translate-y-1/2
                  items-center justify-center
                  rounded-full bg-white/90
                  text-[#344E41] shadow-md
                  transition-all hover:bg-white
                  md:flex
                "
              >
                <ArrowRight size={19} />
              </button>
            </div>

            {/* INDICADORES */}
            <div className="mt-4 flex justify-center gap-2">
              {ABOUT_IMAGES.map((img, index) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Ver imagen ${index + 1}`}
                  aria-current={
                    activeSlide === index ? "true" : undefined
                  }
                  className={`
                    h-2 rounded-full transition-all
                    ${
                      activeSlide === index
                        ? "w-6 bg-[#588157]"
                        : "w-2 bg-[#A3B18A]/40 hover:bg-[#A3B18A]"
                    }
                  `}
                />
              ))}
            </div>
          </motion.div>

          {/* INFORMACIÓN DE LA AGRUPACIÓN */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="min-w-0"
          >
            <span
              className="
                mb-3 block text-[11px]
                font-bold uppercase tracking-[0.16em]
                text-[#588157]
              "
            >
              Agrupación voluntaria
            </span>

            <h2
              className="
                mb-5 font-serif
                text-[34px] font-semibold
                leading-tight tracking-tight
                text-[#344E41]
                sm:text-[45px]
              "
            >
              ¿Quiénes{" "}
              <span className="italic text-[#8DA77A]">
                somos
              </span>
              ?
            </h2>

            <p
              className="
                mb-8 text-[14px] leading-[1.9]
                text-[#6B7C70]
                sm:text-[15px]
              "
            >
              Somos ciudadanas y ciudadanos de{" "}
              <strong className="font-semibold text-[#344E41]">
                Armstrong, Santa Fe (Argentina)
              </strong>{" "}
              que compartimos un mismo propósito:
              construir un presente y un futuro mejor
              para los animales de nuestra ciudad.
              Nuestro lema nos guía en cada paso que damos
              de manera integral y comprometida.
            </p>

            {/* ACCIONES */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ACTIONS.map((action) => {
                const Icon = action.icon;

                return (
                  <div
                    key={action.title}
                    className="
                      flex items-start gap-3
                      rounded-[16px]
                      border border-[#E8EDE5]
                      bg-white/70 p-4
                      transition-all duration-300
                      hover:border-[#A3B18A]/50
                      hover:bg-white
                      hover:shadow-sm
                    "
                  >
                    <div
                      className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-xl bg-[#F0F5EB]
                        text-[#588157]
                      "
                    >
                      <Icon size={19} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <h4
                        className="
                          mb-1 text-[13px]
                          font-semibold text-[#344E41]
                        "
                      >
                        {action.title}
                      </h4>

                      <p
                        className="
                          text-[11px] leading-[1.75]
                          text-[#7B897E]
                          sm:text-[12px]
                        "
                      >
                        {action.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* =============================
            SALUD PÚBLICA
        ============================= */}
        <PublicHealth />
      </div>
    </section>
  );
}
