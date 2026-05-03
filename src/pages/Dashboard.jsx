import { useState } from "react";
import { useAnimals } from "../hooks/useAnimals";
import { animalService } from "../services/animalService";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import Modal from "../components/ui/Modal";
import AnimalForm from "../admin/AnimalForm";
import AnimalTable from "../admin/AnimalTable";
import { Plus, LogOut, PawPrint, LayoutDashboard, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner"; // Importamos Sonner

export default function Dashboard() {
  const { animals, loading, refresh } = useAnimals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success("Sesión cerrada correctamente");
      navigate("/");
    } catch (e) {
      toast.error("Error al cerrar sesión");
      console.error(e);
    }
  };

  const handleOpenCreate = () => {
    setEditingAnimal(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (animal) => {
    setEditingAnimal(animal);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    // Nota: El mensaje de éxito ya lo dispara el AnimalForm, 
    // así que aquí solo refrescamos la lista.
    refresh();
  };

  const handleDelete = async (id, imagenURL) => {
    // Reemplazamos el confirm de navegador por uno más estético si prefieres,
    // pero por ahora mantenemos la lógica con un toast.promise para la eliminación
    if (window.confirm("¿Estás seguro de que querés eliminar este animal?")) {
      try {
        await toast.promise(animalService.delete(id, imagenURL), {
          loading: 'Eliminando animal...',
          success: () => {
            refresh();
            return "Animal eliminado correctamente 🗑️";
          },
          error: "No se pudo eliminar el registro",
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige/20 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-white border-r border-brand-accent/50 p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-16">
          <div className="p-2 bg-brand-primary rounded-xl text-white shadow-lg">
            <PawPrint className="w-6 h-6" />
          </div>
          <span className="text-xl font-black text-slate-800 tracking-tight">P&G Admin</span>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="p-4 bg-brand-accent/30 rounded-2xl flex items-center gap-3 text-brand-primary font-bold shadow-sm">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </div>
          <div className="p-4 hover:bg-slate-50 rounded-2xl flex items-center gap-3 text-slate-400 font-medium transition-colors cursor-not-allowed">
            <Settings className="w-5 h-5" />
            <span>Configuración</span>
          </div>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 p-4 text-red-400 hover:text-red-500 font-bold transition-colors group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-14">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Gestionar Animales</h1>
            <p className="text-slate-400 font-medium italic">Editá, eliminá o cargá nuevas mascotas rescatadas.</p>
          </div>
          <Button onClick={handleOpenCreate} className="flex items-center gap-2 group py-4 px-10 shadow-xl shadow-brand-primary/20">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Cargar nuevo animal
          </Button>
        </header>

        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-4 py-20 bg-white rounded-[3rem] border-2 border-dashed border-brand-accent">
            <Loader size="lg" />
            <p className="text-slate-300 font-bold italic animate-pulse">Consultando base de datos...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3.5rem] shadow-2xl p-8 md:p-12 border border-brand-accent/50 overflow-hidden"
          >
            <AnimalTable 
              animals={animals} 
              onEdit={handleOpenEdit} 
              onDelete={handleDelete} 
            />
          </motion.div>
        )}
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingAnimal ? "Editar Peludito" : "Nuevo Rescatado"}
      >
        <AnimalForm 
          editingAnimal={editingAnimal} 
          onSuccess={handleSuccess} 
        />
      </Modal>

      {/* El componente <Toast /> manual ha sido eliminado ya que usamos Sonner global */}
    </div>
  );
}