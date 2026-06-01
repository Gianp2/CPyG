import { useMemo, useState } from "react";
import useAnimals from "../../hooks/useAnimals";
import AnimalCard from "./AnimalCard";
import AnimalSkeleton from "../ui/AnimalSkeleton";
import {
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

const Requirements = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-16 mb-10 px-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-white border border-brand-primary/20 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
      >
        {/* Contenido centrado */}
        <div className="flex-1 flex items-center justify-center gap-3">
          <span className="text-2xl">✎</span>
          <span className="text-xl font-bold text-brand-dark">
            Requisitos para adoptar
          </span>
        </div>

        {/* Chevron a la derecha */}
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-brand-primary" />
        ) : (
          <ChevronDown className="w-5 h-5 text-brand-primary" />
        )}
      </button>

      {isOpen && (
        <div className="mt-5 animate-in fade-in slide-in-from-top-2 duration-300">

          {/* Cards principales */}
            <div className="flex flex-col items-center gap-5 mb-6">
              <div className="grid md:grid-cols-2 gap-5 w-full max-w-4xl">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-brand-primary/10 text-3xl mb-4">
                    🏠
                  </div>

                  <h3 className="text-lg font-bold text-brand-dark mb-2">
                    Hogar seguro
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    El animal debe contar con un patio cerrado o un espacio seguro
                    para evitar accidentes y garantizar su bienestar.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-brand-primary/10 text-3xl mb-4">
                    💉
                  </div>

                  <h3 className="text-lg font-bold text-brand-dark mb-2">
                    Vacunación al día
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    Es fundamental mantener el calendario de vacunación actualizado
                    durante toda la vida del animal.
                  </p>
                </div>
              </div>
            </div>

            {/* Vacunas */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-6 flex flex-col items-center">
              <h3 className="text-xl font-bold text-brand-dark mb-6 text-center">
                Calendario de vacunación
              </h3>

              <div className="grid md:grid-cols-3 gap-4 w-full max-w-4xl">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col items-center text-center">
                  <div className="text-4xl mb-3">🐶</div>
                  <h4 className="font-bold text-brand-dark mb-2">Perros</h4>
                  <p className="text-sm text-slate-600">
                    Vacuna Séxtuple y Antirrábica anual.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col items-center text-center">
                  <div className="text-4xl mb-3">🐱</div>
                  <h4 className="font-bold text-brand-dark mb-2">Gatos</h4>
                  <p className="text-sm text-slate-600">
                    Triple Felina y Antirrábica anual.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col items-center text-center">
                  <div className="text-4xl mb-3">🐾</div>
                  <h4 className="font-bold text-brand-dark mb-2">Cachorros</h4>
                  <p className="text-sm text-slate-600">
                    Vacunas adicionales según criterio veterinario.
                  </p>
                </div>
              </div>
            </div>

          {/* Castración */}
          <div className="rounded-[32px] overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-[#588157] to-[#6E9B62] p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold">Condición indispensable</h3>
              </div>

              <p className="text-lg text-white/95 mb-6">
                Compromiso de realizar la castración a la edad correspondiente.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <span className="text-xl">✔</span>
                    <span>
                      Turnos disponibles en Veterinaria El Estribo, San Jorge o
                      El Palenque.
                    </span>
                  </li>

                  <li className="flex gap-3 items-start">
                    <span className="text-xl">✔</span>
                    <span>
                      Castraciones gratuitas para perros, perras, gatos y
                      gatas.
                    </span>
                  </li>

                  <li className="flex gap-3 items-start">
                    <span className="text-xl">✔</span>
                    <span>
                      También podés acceder a cualquiera de las jornadas
                      masivas de castración.
                    </span>
                  </li>
                </ul>
              </div>

              <p className="mt-6 text-sm text-white/80 text-center">
                ❤️ Adoptar implica compromiso, responsabilidad y amor para toda
                la vida.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdoptionSection = () => (
  <div className="mt-16 space-y-8">
    <div className="p-8 bg-brand-primary/10 rounded-3xl border border-brand-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex gap-4 items-start">
        <div className="p-3 bg-brand-primary/20 rounded-2xl text-brand-primary">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-brand-dark">Denuncia de maltrato animal</h4>
          <p className="text-brand-dark/70 text-sm mt-1 max-w-sm">
            Si eres testigo de un caso de maltrato, tu reporte es fundamental.
          </p>
        </div>
      </div>
      <a 
        href="https://docs.google.com/forms/d/e/1FAIpQLSczB-o99SY-NIYu4W9C2ZTbWFLkkI9TA2jUvdjmgLqF98brWg/viewform?usp=publish-editor" 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-dark transition-all shadow-md whitespace-nowrap"
      >
        Realizar denuncia
      </a>
    </div>
  </div>
);

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

        <Requirements />
        <AdoptionSection />
      </div>
    </section>
  );
}