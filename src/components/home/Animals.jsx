import { useMemo, useState } from "react";
import useAnimals from "../../hooks/useAnimals";
import AnimalCard from "./AnimalCard";
import AnimalSkeleton from "../ui/AnimalSkeleton";
import { Search, ChevronDown, X } from "lucide-react";

// ==================== REQUISITOS PARA ADOPTAR (Modal) ====================
const Requirements = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      {/* Botón disparador */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between p-6 bg-white border-2 border-brand-primary/20 rounded-3xl shadow-sm hover:border-brand-primary hover:shadow-md transition-all duration-300"
      >
        <span className="text-xl font-bold text-brand-dark flex items-center gap-3">
           Requisitos para adoptar
        </span>
        <div className="bg-brand-primary/10 p-2 rounded-full">
          <ChevronDown className="w-6 h-6 text-brand-primary" />
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Fondo oscuro */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
            onClick={() => setIsOpen(false)}
          />

          {/* Card Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] p-8 md:p-10 max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">

                  <h2 className="text-3xl font-bold text-brand-dark">Requisitos para adoptar</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-3 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-7 h-7 text-slate-500" />
                </button>
              </div>

              {/* Contenido */}
              <div className="space-y-10">
                {/* Requisitos principales */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-5 p-6 bg-slate-50 rounded-3xl">
                    <img src="/casa.png" alt="Hogar seguro" className="w-14 h-14 object-contain flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-xl text-brand-dark mb-2">Hogar seguro</h3>
                      <p className="text-slate-600">
                        El animal debe contar con un patio cerrado o un espacio seguro para garantizar su bienestar.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5 p-6 bg-slate-50 rounded-3xl">
                    <img src="/inyeccion.png" alt="Vacunación" className="w-14 h-14 object-contain flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-xl text-brand-dark mb-2">Vacunación al día</h3>
                      <p className="text-slate-600">
                        Es fundamental mantener el calendario de vacunación actualizado durante toda la vida del animal.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calendario de vacunación */}
                <div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-6 text-center">
                    Calendario de vacunación
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { icon: "/perro.png", title: "Perros", desc: "Vacuna Séxtuple y Antirrábica anual." },
                      { icon: "/gato.png", title: "Gatos", desc: "Triple Felina y Antirrábica anual." },
                      { icon: "/cachorro.png", title: "Cachorros", desc: "Vacunas adicionales según criterio veterinario." }
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-50 rounded-3xl p-6 text-center border border-slate-100">
                        <img src={item.icon} alt={item.title} className="w-20 h-20 mx-auto mb-4 object-contain" />
                        <h4 className="font-bold text-brand-dark text-lg mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Castración */}
                <div className="bg-gradient-to-r from-[#588157] to-[#6E9B62] rounded-3xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Condición indispensable</h3>
                  <p className="text-lg text-white/90 mb-6">
                    Compromiso de realizar la castración a la edad correspondiente.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3 items-start bg-white/10 p-4 rounded-2xl">
                      ✔ Turnos en Veterinaria El Estribo, San Jorge o El Palenque.
                    </li>
                    <li className="flex gap-3 items-start bg-white/10 p-4 rounded-2xl">
                      ✔ Castraciones gratuitas para perros, perras, gatos y gatas.
                    </li>
                    <li className="flex gap-3 items-start bg-white/10 p-4 rounded-2xl">
                      ✔ Disponibilidad en jornadas masivas de castración.
                    </li>
                  </ul>
                  <p className="mt-8 text-center text-white/80 text-sm">
                    ❤ Adoptar implica compromiso, responsabilidad y amor para toda la vida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
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
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-primary shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Pills de tamaño */}
            <div className="flex gap-2">
              {["Pequeño", "Mediano", "Grande"].map((size) => (
                <button
                  key={size}
                  onClick={() => setFilterSize(filterSize === size ? null : size)}
                  className={`px-5 py-2 rounded-full font-bold transition-all border ${
                    filterSize === size
                      ? "bg-brand-primary text-white border-brand-primary shadow-md"
                      : "bg-white text-slate-600 border-slate-200 hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Requisitos (ahora dentro del bloque principal) */}
            <Requirements />
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