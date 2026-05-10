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
import { Plus, LogOut, PawPrint, LayoutDashboard, Settings, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

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
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-brand-beige/40 via-white to-brand-accent/20 flex flex-col md:flex-row overflow-x-hidden">
      
      {/* SIDEBAR - Ahora con posición fija en escritorio para evitar choques */}
      <aside className="w-full md:w-72 md:fixed md:inset-y-0 md:left-0 z-50 p-4 md:p-6">
        <div className="h-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-section p-6 flex flex-col">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="p-2.5 bg-brand-primary rounded-2xl text-white shadow-lg">
              <PawPrint className="w-6 h-6" />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight">P&G Admin</span>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-3">
            <motion.div whileHover={{ x: 5 }} className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-center gap-3 text-brand-primary font-bold">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </motion.div>

            <div className="p-4 hover:bg-white/50 rounded-2xl flex items-center gap-3 text-slate-400 font-medium transition-all cursor-not-allowed">
              <Settings className="w-5 h-5" />
              <span>Configuración</span>
            </div>
          </nav>

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 p-4 text-red-500 hover:bg-red-50/50 rounded-2xl font-bold transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Salir</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT - Agregamos md:ml-72 para compensar el ancho del sidebar fijo */}
      <main className="flex-1 p-6 md:p-12 lg:p-16 md:ml-72 transition-all">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Gestionar Animales</h1>
            <p className="text-slate-500 font-medium">Panel de control de rescates y adopciones.</p>
          </div>
          <Button onClick={() => { setEditingAnimal(null); setIsModalOpen(true); }} className="flex items-center gap-2 py-4 px-8 shadow-xl shadow-brand-primary/20 rounded-2xl">
            <Plus className="w-5 h-5" />
            Nuevo animal
          </Button>
        </header>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-4 bg-white/30 backdrop-blur-sm rounded-[3rem] border-2 border-dashed border-brand-accent/50">
            <Loader size="lg" />
            <p className="text-slate-400 font-bold italic animate-pulse">Cargando datos...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-md rounded-[3rem] shadow-xl p-6 md:p-10 border border-white overflow-hidden"
          >
            <AnimalTable 
              animals={animals} 
              onEdit={(a) => { setEditingAnimal(a); setIsModalOpen(true); }} 
              onDelete={(id, url) => {/* Tu lógica de delete */}} 
            />
          </motion.div>
        )}
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingAnimal ? "Editar" : "Nuevo"}>
        <AnimalForm editingAnimal={editingAnimal} onSuccess={() => { setIsModalOpen(false); refresh(); }} />
      </Modal>
    </div>
  );
}