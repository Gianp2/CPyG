import { useMemo, useState } from "react";
import useAnimals from "../../hooks/useAnimals";
import AnimalCard from "./AnimalCard";
import { Search } from "lucide-react";

export default function Animals() {
  const { animals, loading, error } = useAnimals();
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

  const SkeletonCard = useMemo(
    () => (
      <div className="h-[400px] w-full bg-gray-200 animate-pulse rounded-3xl" />
    ),
    []
  );

  return (
    <section id="animals" className="max-w-[1400px] mx-auto px-4 py-16">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-serif text-brand-dark mb-3">
            Animales en adopción
          </h2>
          <p className="text-brand-primary text-base font-bold italic">
            Encontrá su hogar ideal →
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-1 p-1 bg-white rounded-2xl border border-slate-200">
            {["Todos", "Pequeño", "Mediano", "Grande"].map((size) => (
              <button
                key={size}
                onClick={() => setFilterSize(size)}
                className={`px-4 py-2 text-xs font-black uppercase rounded-xl transition-all ${
                  filterSize === size
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GRID DE CARDS */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>{SkeletonCard}</div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-20 bg-red-50 rounded-3xl border border-red-100">
          Error al cargar animales: {error}
        </div>
      ) : filteredAnimals.length === 0 ? (
        <div className="text-center py-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
          <p className="text-xl font-medium">No encontramos animalitos con esos filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}
    </section>
  );
}