import { Edit2, Trash2, ExternalLink } from "lucide-react";
import { formatDate } from "../lib/utils";

export default function AnimalTable({ animals, onEdit, onDelete }) {
  if (animals.length === 0) {
    return (
      <div className="text-center py-20 italic text-slate-400">
        No hay animales cargados aún. ¡Empezá cargando el primero!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b border-brand-accent">
            <th className="pb-6 text-xs font-black uppercase tracking-widest text-slate-400 font-sans pl-4">Animal</th>
            <th className="pb-6 text-xs font-black uppercase tracking-widest text-slate-400 font-sans">Estado</th>
            <th className="pb-6 text-xs font-black uppercase tracking-widest text-slate-400 font-sans">Fecha</th>
            <th className="pb-6 text-right text-xs font-black uppercase tracking-widest text-slate-400 font-sans pr-4">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {animals.map((animal) => (
            <tr key={animal.id} className="group hover:bg-brand-beige/20 transition-colors">
              <td className="py-6 pl-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0">
                    <img 
                      src={animal.imagenURL || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200"} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-black text-slate-800 text-lg leading-tight">{animal.nombre}</p>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{animal.tamaño} • {animal.edad}</p>
                  </div>
                </div>
              </td>
              <td className="py-6">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  animal.estado === "Adoptado" ? "bg-slate-100 text-slate-400" : "bg-blue-100 text-blue-600"
                }`}>
                  {animal.estado}
                </span>
              </td>
              <td className="py-6 text-sm text-slate-400 font-medium">
                {formatDate(animal.fechaCreacion)}
              </td>
              <td className="py-6 pr-4 text-right">
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => onEdit(animal)}
                    className="p-3 bg-white border border-brand-accent text-slate-400 hover:text-brand-primary hover:border-brand-primary hover:shadow-md rounded-xl transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(animal.id, animal.imagenURL)}
                    className="p-3 bg-white border border-brand-accent text-slate-400 hover:text-red-400 hover:border-red-200 hover:shadow-md rounded-xl transition-all"
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
  );
}
