import { useMemo, useState, useEffect } from "react";
import useAnimals from "../../hooks/useAnimals";
import AnimalCard from "./AnimalCard";
import AnimalSkeleton from "../ui/AnimalSkeleton";
import { Search, X, ClipboardCheck, Home, Syringe, Dog, Cat, PawPrint, HeartHandshake, CheckCircle2 } from "lucide-react";

// ==================== REQUISITOS PARA ADOPTAR (Modal) ====================
const Requirements = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Efecto para bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Botón disparador estilo pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-2.5 px-6 py-2.5 bg-white border border-brand-primary/30 rounded-full shadow-sm hover:border-brand-primary hover:bg-brand-primary/5 transition-all duration-300 text-brand-dark font-medium text-sm md:text-base cursor-pointer"
      >
        <span className="bg-brand-primary/10 p-1.5 rounded-full text-brand-primary group-hover:scale-110 transition-transform">
          <ClipboardCheck className="w-4 h-4" />
        </span>
        <span>Requisitos para adoptar</span>
      </button>

      {/* Modal - z-[9999] asegura que esté por encima del navbar */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Fondo oscuro con difuminado suave */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setIsOpen(false)}
          />

          {/* Contenedor del Modal */}
          <div className="relative bg-white rounded-[32px] w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 my-auto border border-slate-100 z-10">
            
            {/* Header Fijo Estético */}
            <div className="relative px-6 pt-8 pb-6 md:px-10 border-b border-slate-100 flex justify-between items-center bg-gradient-to-b from-slate-50/50 to-white">
              <div className="flex items-center gap-3">
                <div className="bg-brand-primary/10 p-3 rounded-2xl text-brand-primary">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">Guía de Adopción</h2>
                  <p className="text-xs md:text-sm text-slate-500">Todo lo que necesitas saber para darle un hogar a un peludo</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido con Scroll interno */}
            <div className="p-6 md:p-10 space-y-8 max-h-[75vh] overflow-y-auto">
              
              {/* 1. Requisitos Principales */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex gap-4 p-5 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-100 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0 text-brand-primary">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-brand-dark mb-1">Hogar seguro</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      El animal debe contar con un patio cerrado o un espacio seguro para garantizar su bienestar y protección.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-100 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0 text-brand-primary">
                    <Syringe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-brand-dark mb-1">Vacunación al día</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Es fundamental mantener el calendario de vacunación actualizado durante toda la vida del animal.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Calendario de vacunación */}
              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-4 text-center">
                  Calendario de Vacunación
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: Dog, title: "Perros", desc: "Vacuna Séxtuple y Antirrábica anual." },
                    { icon: Cat, title: "Gatos", desc: "Triple Felina y Antirrábica anual." },
                    { icon: PawPrint, title: "Cachorros", desc: "Vacunas adicionales según criterio veterinario." }
                  ].map((item, i) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={i} className="bg-white rounded-2xl p-5 text-center border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-brand-dark text-base mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Castración (Banner destacado) */}
              <div className="bg-gradient-to-br from-[#588157] to-[#4a6b49] rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                  <PawPrint className="w-48 h-48" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Condición indispensable</h3>
                <p className="text-white/90 text-sm md:text-base mb-6">
                  Compromiso de realizar la castración a la edad correspondiente.
                </p>
                
                <div className="grid sm:grid-cols-3 gap-3 mb-6">
                  <div className="flex gap-3 items-center bg-white/10 backdrop-blur-sm p-3.5 rounded-xl text-xs md:text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-white" />
                    <span>Turnos en Veterinaria El Estribo, San Jorge o El Palenque.</span>
                  </div>
                  <div className="flex gap-3 items-center bg-white/10 backdrop-blur-sm p-3.5 rounded-xl text-xs md:text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-white" />
                    <span>Castraciones gratuitas para perros y gatos.</span>
                  </div>
                  <div className="flex gap-3 items-center bg-white/10 backdrop-blur-sm p-3.5 rounded-xl text-xs md:text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-white" />
                    <span>Disponibilidad en jornadas masivas.</span>
                  </div>
                </div>

                <p className="text-center text-white/90 text-xs md:text-sm font-medium pt-2 border-t border-white/10">
                  ❤ Adoptar implica compromiso, responsabilidad y amor para toda la vida.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ==================== COMPONENTE PRINCIPAL ====================
export default function Animals() {
  const { animals, loading } = useAnimals();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSize, setFilterSize] = useState(null);

  const filteredAnimals = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return animals.filter((animal) => {
      const matchesSearch = animal.nombre?.toLowerCase().includes(search);
      const matchesSize = filterSize === null || animal.tamaño === filterSize;
      return matchesSearch && matchesSize;
    });
  }, [animals, searchTerm, filterSize]);

  return (
    <section id="animals" className="py-10 md:py-20 bg-brand-bg/10" aria-labelledby="animals-title">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 id="animals-title" className="text-3xl md:text-5xl font-serif text-brand-dark mb-8">
            Ellos esperan por vos...
          </h2>

          <div className="flex flex-col gap-6 items-center">
            {/* Buscador */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-primary shadow-sm bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Pills de tamaño y Botón de Requisitos */}
            <div className="flex flex-wrap gap-2 items-center justify-center">
              {["Pequeño", "Mediano", "Grande"].map((size) => (
                <button
                  key={size}
                  onClick={() => setFilterSize(filterSize === size ? null : size)}
                  className={`px-5 py-2 rounded-full font-bold transition-all border cursor-pointer ${
                    filterSize === size
                      ? "bg-brand-primary text-white border-brand-primary shadow-md"
                      : "bg-white text-slate-600 border-slate-200 hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {size}
                </button>
              ))}

              <Requirements />
            </div>
          </div>
        </div>

        {/* MOBILE: Carrusel horizontal */}
        <div className="md:hidden w-full overflow-x-auto pb-8 scroll-smooth scrollbar-hide">
          <div className="grid grid-rows-2 grid-flow-col gap-4 w-max px-2">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-[170px]">
                  <AnimalSkeleton />
                </div>
              ))
            ) : filteredAnimals.length > 0 ? (
              filteredAnimals.map((animal) => (
                <div key={animal.id} className="w-[170px]">
                  <AnimalCard animal={animal} />
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-10">
                No hay animalitos con esos filtros.
              </p>
            )}
          </div>
        </div>

        {/* TABLET Y PC: Grid normal */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <AnimalSkeleton key={i} />
            ))
          ) : filteredAnimals.length > 0 ? (
            filteredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))
          ) : (
            <div className="col-span-full">
              <p className="text-center text-slate-500 py-10">
                No hay animalitos con esos filtros.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}