import { useMemo, useState } from "react";
import useAnimals from "../../hooks/useAnimals";
import AnimalCard from "./AnimalCard";
import { Search } from "lucide-react";

export default function Animals() {
  const { animals, loading } = useAnimals();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSize, setFilterSize] = useState("Todos");

  const filteredAnimals = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return animals.filter((animal) => {
      const matchesSearch = animal.nombre?.toLowerCase().includes(search);
      const matchesSize = filterSize === "Todos" || animal.tamaño === filterSize;
      return matchesSearch && matchesSize;
    });
  }, [animals, searchTerm, filterSize]);

  return (
    <section id="animals" className="py-10 md:py-20 bg-brand-bg/10">
      <div className="flex flex-col items-center text-center mb-8 gap-6 max-w-6xl mx-auto px-4">
        <div>
          <h2 className="text-4xl md:text-6xl text-brand-dark mb-2 font-serif font-bold">Nuestros Amigos</h2>
          <p className="text-brand-primary text-sm md:text-lg font-bold italic">Encuentra a tu compañero ideal</p>
        </div>

        <div className="flex flex-col gap-5 w-full max-w-md">
          {/* Buscador */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtros sin barra de scroll visible */}
          <div className="relative w-full">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 px-1 justify-start md:justify-center">
              {["Todos", "Pequeño", "Mediano", "Grande"].map((size) => (
                <button
                  key={size}
                  onClick={() => setFilterSize(size)}
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
              <div key={i} className="aspect-square bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}