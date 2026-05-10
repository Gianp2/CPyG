import { Edit2, Trash2, Calendar, PawPrint } from "lucide-react";
import { formatDate } from "../lib/utils";

export default function AnimalTable({ animals, onEdit, onDelete }) {
  if (animals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="bg-slate-50 p-6 rounded-full mb-4">
          <PawPrint className="w-10 h-10 text-slate-300" />
        </div>
        <p className="italic text-slate-400 font-medium">
          No hay animales cargados aún.<br /> ¡Empezá cargando el primero!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* VISTA PARA MÓVILES (Cards) - Se oculta en tablets/pc */}
      <div className="grid grid-cols-1 gap-4 md:hidden px-2">
        {animals.map((animal) => (
          <div 
            key={animal.id} 
            className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="flex gap-4 items-start mb-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-inner shrink-0">
                <img 
                  src={animal.imagenURL || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200"} 
                  className="w-full h-full object-cover"
                  alt={animal.nombre}
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-black text-slate-800 text-xl leading-tight">{animal.nombre}</h3>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                    animal.estado === "Adoptado" ? "bg-slate-100 text-slate-400" : "bg-green-100 text-green-600"
                  }`}>
                    {animal.estado}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                  {animal.tamaño} • {animal.edad}
                </p>
                <div className="flex items-center gap-1 mt-2 text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span className="text-[11px] font-medium">{formatDate(animal.fechaCreacion)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 border-t border-slate-50 pt-3">
              <button 
                onClick={() => onEdit(animal)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-brand-beige transition-colors"
              >
                <Edit2 className="w-4 h-4" /> Editar
              </button>
              <button 
                onClick={() => onDelete(animal.id, animal.imagenURL)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-500 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VISTA PARA DESKTOP (Tabla) - Se oculta en celulares */}
      <div className="hidden md:block overflow-hidden bg-white rounded-[2rem] border border-slate-100 shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-slate-50/50">
              <th className="py-5 pl-8 text-xs font-black uppercase tracking-[0.2em] text-slate-400 font-sans">Animal</th>
              <th className="py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 font-sans">Estado</th>
              <th className="py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 font-sans">Fecha</th>
              <th className="py-5 text-right text-xs font-black uppercase tracking-[0.2em] text-slate-400 font-sans pr-8">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {animals.map((animal) => (
              <tr key={animal.id} className="group hover:bg-slate-50/80 transition-all">
                <td className="py-5 pl-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={animal.imagenURL || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200"} 
                        className="w-full h-full object-cover"
                        alt={animal.nombre}
                      />
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-lg leading-tight">{animal.nombre}</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{animal.tamaño} • {animal.edad}</p>
                    </div>
                  </div>
                </td>
                <td className="py-5">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    animal.estado === "Adoptado" ? "bg-slate-100 text-slate-400" : "bg-green-100 text-green-600"
                  }`}>
                    {animal.estado}
                  </span>
                </td>
                <td className="py-5 text-sm text-slate-400 font-semibold italic">
                  {formatDate(animal.fechaCreacion)}
                </td>
                <td className="py-5 pr-8 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit(animal)}
                      className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-200 hover:shadow-sm rounded-xl transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(animal.id, animal.imagenURL)}
                      className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:shadow-sm rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}