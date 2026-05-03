import { useState, useRef } from "react";
import { animalService } from "../services/animalService";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { Upload, Save, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner"; // Eliminamos Toaster de aquí, ya está en App.tsx

export default function AnimalForm({ editingAnimal, onSuccess }) {
  const [formData, setFormData] = useState({
    nombre: editingAnimal?.nombre || "",
    edad: editingAnimal?.edad || "",
    tamaño: editingAnimal?.tamaño || "Mediano",
    descripcion: editingAnimal?.descripcion || "",
    estado: "En adopción",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(editingAnimal?.imagenURL || null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      
      toast.success("¡Imagen lista!", {
        description: "La foto se cargó correctamente.",
        icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!preview && !file) {
      return toast.warning("Atención", {
        description: "Es obligatorio subir una foto del animal.",
        icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
      });
    }

    try {
      setLoading(true);

      if (editingAnimal) {
        await toast.promise(
          animalService.update(editingAnimal.id, formData, file),
          {
            loading: "Actualizando datos...",
            success: () => {
              onSuccess();
              return "¡Cambios guardados con éxito! ✨";
            },
            error: (err) => `Ups, algo falló: ${err.message}`,
          }
        );
      } else {
        await toast.promise(
          animalService.create(formData, file),
          {
            loading: "Creando nueva ficha...",
            success: () => {
              onSuccess();
              setFormData({
                nombre: "",
                edad: "",
                tamaño: "Mediano",
                descripcion: "",
                estado: "En adopción",
              });
              setFile(null);
              setPreview(null);
              return "¡Bienvenido al refugio! 🐾";
            },
            error: (err) => `No se pudo crear: ${err.message}`,
          }
        );
      }
    } catch (error) {
        console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    toast.custom((t) => (
      <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-2xl flex flex-col gap-4 min-w-[320px]">
        <div className="flex items-start gap-4">
          <div className="bg-red-100 p-3 rounded-2xl">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-black text-slate-900 text-lg">¿Borrar a {editingAnimal.nombre}?</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Esta acción eliminará permanentemente la ficha.
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => {
              toast.dismiss(t);
              confirmDeletion();
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Sí, eliminar
          </button>
          <button
            onClick={() => toast.dismiss(t)}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl transition-colors"
          >
            No, volver
          </button>
        </div>
      </div>
    ), { duration: 6000 });
  };

  const confirmDeletion = async () => {
    try {
      setLoading(true);
      await toast.promise(
        animalService.delete(editingAnimal.id),
        {
          loading: "Borrando registro...",
          success: () => {
            onSuccess();
            return "El animal ha sido quitado de la lista 🗑️";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-6 py-4 bg-white/80 backdrop-blur-md rounded-2xl border border-brand-accent/30 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all placeholder:text-slate-400 text-slate-900 shadow-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* FOTO */}
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-4">
          Foto del Animal
        </label>
        <div
          onClick={() => fileInputRef.current.click()}
          className="relative group cursor-pointer aspect-video rounded-4xl overflow-hidden border-4 border-dashed border-brand-accent/40 hover:border-brand-primary transition-all duration-300 flex items-center justify-center bg-brand-beige/10 hover:scale-[1.01]"
        >
          {preview ? (
            <>
              <img src={preview} className="w-full h-full object-cover" alt="Vista previa" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white font-black gap-3 text-lg backdrop-blur-sm">
                <Upload className="w-6 h-6" /> Cambiar Foto
              </div>
            </>
          ) : (
            <div className="text-center text-slate-400 group-hover:text-brand-primary transition-colors">
              <Upload className="w-14 h-14 mx-auto mb-3" />
              <p className="font-black text-lg">Subir foto</p>
              <span className="text-sm opacity-70">JPG, PNG o WEBP</span>
            </div>
          )}
          <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
        </div>
      </div>

      {/* NOMBRE + EDAD */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-4">Nombre</label>
          <input
            type="text"
            required
            placeholder="Ej: Luna"
            className={inputClasses}
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-4">Edad</label>
          <input
            type="text"
            required
            placeholder="Ej: 2 años"
            className={inputClasses}
            value={formData.edad}
            onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
          />
        </div>
      </div>

      {/* TAMAÑO */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-4">Tamaño</label>
          <select
            className={inputClasses}
            value={formData.tamaño}
            onChange={(e) => setFormData({ ...formData, tamaño: e.target.value })}
          >
            <option value="Pequeño">Pequeño</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-4">Estado</label>
          <div className={`${inputClasses} bg-brand-primary/10 text-brand-primary font-black flex items-center`}>
            🐾 En adopción
          </div>
        </div>
      </div>

      {/* DESCRIPCIÓN */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-4">Personalidad</label>
        <textarea
          required
          rows="4"
          placeholder="Contá cómo es el animal..."
          className={`${inputClasses} resize-none`}
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        />
      </div>

      {/* BOTONES */}
      <div className="flex flex-col gap-4">
        <Button
          disabled={loading}
          className="w-full py-5 text-lg font-black flex justify-center items-center gap-3 rounded-2xl"
        >
          {loading ? <Loader /> : (
            <>
              <Save className="w-5 h-5" />
              {editingAnimal ? "Guardar Cambios" : "Crear Ficha"}
            </>
          )}
        </Button>

        {editingAnimal && (
          <Button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="w-full py-5 text-lg font-black flex justify-center items-center gap-3 rounded-2xl bg-red-50/50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors shadow-none"
          >
            <Trash2 className="w-5 h-5" />
            Eliminar Animal
          </Button>
        )}
      </div>
    </form>
  );
}