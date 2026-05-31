import { useMemo, useState } from "react";
import useAnimals from "../../hooks/useAnimals";
import AnimalCard from "./AnimalCard";
import AnimalSkeleton from "../ui/AnimalSkeleton";
import { Search, Plus, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

// Componente de Requisitos desplegable
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
            <li className="ml-6 space-y-1 text-sm">
              <p>🐶 <strong>Perros:</strong> Séxtuple + Antirrábica</p>
              <p>🐱 <strong>Gatos:</strong> Triple felina + Antirrábica</p>
              <p>🐾 <strong>Cachorros:</strong> Vacunas adicionales (Puppy y otras) según criterio del veterinario.</p>
            </li>
          </ul>
          
          <div className="pt-4 border-t border-slate-100">
            <p className="font-bold text-brand-dark mb-2">📌 Condición indispensable</p>
            <p className="mb-2">Compromiso de castración a la edad correspondiente.</p>
            <p className="text-sm">Te pasamos el turno en Veterinaria El Estribo, San Jorge o El Palenque, a elección.</p>
            <ul className="mt-3 space-y-1 text-sm italic text-brand-primary">
              <li className="flex items-center gap-2">✔️ Castraciones gratuitas para perros, perras, gatos y gatas.</li>
              <li className="flex items-center gap-2">✔️ O en alguna de las 5 castraciones masivas.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const AdoptionButton = () => (
  <div className="mt-16 flex flex-col items-center gap-4 p-8 bg-brand-primary/5 rounded-3xl border border-brand-primary/10">
    <h3 className="text-2xl font-bold text-brand-dark">¿Quieres formar parte?</h3>
    <p className="text-slate-600 text-center max-w-md">
      Ya sea que estés listo para adoptar o quieras postularte como hogar de tránsito/adoptante, 
      completa nuestro formulario y nos pondremos en contacto.
    </p>
    <a 
      href="https://forms.gle/AMy273hRAUMq1Nrd8" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Ir al formulario de contacto para adopción o postulación"
      className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-dark transition-all shadow-lg mt-2"
    >
      <ExternalLink className="w-5 h-5" aria-hidden="true" />
      Completar formulario
    </a>
  </div>
);

export default function Animals() {
  const { animals, loading } = useAnimals();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSize, setFilterSize] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredAnimals = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return animals.filter((animal) => {
      const matchesSearch = animal.nombre?.toLowerCase().includes(search);
      const matchesSize = filterSize === null || animal.tamaño === filterSize;
      return matchesSearch && matchesSize;
    });
  }, [animals, searchTerm, filterSize]);

  const displayedAnimals = filteredAnimals.slice(0, visibleCount);

  const handleFilterClick = (size) => {
    setFilterSize(prev => prev === size ? null : size);
  };

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

            {/* Contenedor centralizado de filtros */}
            <div className="w-full max-w-md overflow-x-auto py-2 scrollbar-hide">
              <div className="flex flex-row justify-center gap-2 min-w-max px-2">
                {["Pequeño", "Mediano", "Grande"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleFilterClick(size)}
                    className={`px-5 py-2 rounded-full font-bold transition-all border whitespace-nowrap ${
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
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6" aria-live="polite">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <AnimalSkeleton key={i} />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {displayedAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>

            <Requirements />

            {filteredAnimals.length > visibleCount && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  className="flex items-center gap-2 px-8 py-3 bg-white text-brand-primary border-2 border-brand-primary rounded-xl font-bold hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                >
                  <Plus className="w-5 h-5" aria-hidden="true" />
                  Ver más animales
                </button>
              </div>
            )}
            
            {filteredAnimals.length === 0 && !loading && (
              <p className="text-center text-slate-500 py-10" role="status">No encontramos animalitos con esos filtros.</p>
            )}

            <AdoptionButton />
          </>
        )}
      </div>
    </section>
  );
}