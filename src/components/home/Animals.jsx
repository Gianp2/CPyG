import { useMemo, useState } from "react";
import useAnimals from "../../hooks/useAnimals";
import AnimalCard from "./AnimalCard";
import AnimalSkeleton from "../ui/AnimalSkeleton";
import { Search, ExternalLink, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";

const Requirements = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="max-w-2xl mx-auto mt-12 mb-6 px-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white border border-brand-primary/20 rounded-xl font-bold text-brand-dark hover:border-brand-primary transition-all shadow-sm"
      >
        <span>Requisitos para la adopción</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isOpen && (
        <div className="mt-2 p-6 bg-white border border-brand-primary/10 rounded-xl shadow-lg text-slate-600 animate-in fade-in slide-in-from-top-2">
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><span>🏠</span> <strong>Patio cerrado</strong></li>
            <li className="flex items-start gap-2"><span>💉</span> <strong>Vacunación anual</strong></li>
          </ul>
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
            Ellos esperan por vos
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

        {/* Carrusel 2x2 con Scroll Horizontal */}
        <div className="w-full overflow-x-auto pb-8 scroll-smooth scrollbar-hide">
          <div className="grid grid-rows-2 grid-flow-col gap-4 w-max px-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-[170px] md:w-[280px]">
                  <AnimalSkeleton />
                </div>
              ))
            ) : filteredAnimals.length > 0 ? (
              filteredAnimals.map((animal) => (
                <div key={animal.id} className="w-[170px] md:w-[280px]">
                  <AnimalCard animal={animal} />
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-10 w-full col-span-2">No hay animalitos con esos filtros.</p>
            )}
          </div>
        </div>

        <Requirements />
        <AdoptionSection />
      </div>
    </section>
  );
}