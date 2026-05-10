import { useMemo, useState } from "react";
import useAnimals from "../../hooks/useAnimals";
import AnimalCard from "./AnimalCard";
import { Search, Plus } from "lucide-react";

export default function Animals() {
  const { animals, loading } = useAnimals();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSize, setFilterSize] = useState("Todos");
  
  // ESTADO PARA PAGINACIÓN: Solo mostramos 8 al principio
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredAnimals = useMemo(() => {
    const search = searchTerm.toLowerCase();
    const result = animals.filter((animal) => {
      const matchesSearch = animal.nombre?.toLowerCase().includes(search);
      const matchesSize = filterSize === "Todos" || animal.tamaño === filterSize;
      return matchesSearch && matchesSize;
    });
    // Resetear la paginación cuando el usuario busca o filtra
    return result;
  }, [animals, searchTerm, filterSize]);

  // Cortamos la lista para mostrar solo los visibles
  const displayedAnimals = filteredAnimals.slice(0, visibleCount);

  return (
    <section id="animals" className="py-10 md:py-20 bg-brand-bg/10">
      <div className="flex flex-col items-center text-center mb-8 gap-6 max-w-6xl mx-auto px-4">
        <div>
          <h2 className="text-4xl md:text-6xl text-brand-dark mb-2 font-serif font-bold">Nuestros Amigos</h2>
          <p className="text-brand-primary text-sm md:text-lg font-bold italic">Encuentra a tu compañero ideal</p>
        </div>

        <div className="flex flex-col gap-5 w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(8); // Resetear vista al buscar
              }}
            />
          </div>

          <div className="relative w-full">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 px-1 justify-start md:justify-center">
              {["Todos", "Pequeño", "Mediano", "Grande"].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setFilterSize(size);
                    setVisibleCount(8); // Resetear vista al filtrar
                  }}
                  className={`px-6 py-2.5 text-[10px] font-bold uppercase rounded-full transition-all flex-shrink-0 border ${
                    filterSize === size 
                      ? "bg-brand-primary text-white border-brand-primary shadow-md" 
                      : "bg-white text-slate-500 border-slate-200 hover:border-brand-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {displayedAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>

            {/* BOTÓN CARGAR MÁS: Mejora el Performance inicial */}
            {filteredAnimals.length > visibleCount && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  className="flex items-center gap-2 px-8 py-3 bg-white text-brand-primary border-2 border-brand-primary rounded-xl font-bold hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                  Ver más animales
                </button>
              </div>
            )}
            
            {filteredAnimals.length === 0 && !loading && (
              <p className="text-center text-slate-500 py-10">No encontramos animalitos con esos filtros.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}