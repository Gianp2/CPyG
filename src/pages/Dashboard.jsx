import { useState } from "react";
import { useAnimals } from "../hooks/useAnimals";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import Modal from "../components/ui/Modal";
import AnimalForm from "../admin/AnimalForm";
import AnimalTable from "../admin/AnimalTable";
import { Plus, LogOut, PawPrint, LayoutDashboard, Settings, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function Dashboard() {
  const { animals, loading, refresh } = useAnimals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col md:flex-row overflow-x-hidden">
      
      {/* HEADER MÓVIL - z-index bajo (50) */}
      <div className="md:hidden flex items-center justify-between p-5 bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="bg-brand-primary p-1.5 rounded-lg">
            <PawPrint className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-slate-800 tracking-tighter text-lg">P&G ADMIN</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2.5 bg-slate-50 rounded-2xl text-slate-600 active:scale-90 transition-all border border-slate-100"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* OVERLAY MÓVIL - z-index intermedio (70) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR - z-index máximo (80) */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 p-6 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:w-80
      `}>
        <div className="h-full bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] p-6 flex flex-col relative">
          {/* Botón cerrar dentro del sidebar (solo móvil) */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-3 mb-10 px-2 mt-4 md:mt-0">
            <div className="p-2 bg-brand-primary rounded-xl text-white shadow-lg">
              <PawPrint className="w-6 h-6" />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight">P&G Admin</span>
          </div>

          <nav className="flex-1 space-y-2">
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center gap-3 font-bold shadow-xl shadow-slate-200">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </div>
            <div className="p-4 hover:bg-slate-50 rounded-2xl flex items-center gap-3 text-slate-400 font-semibold transition-all cursor-not-allowed">
              <Settings className="w-5 h-5" />
              <span>Configuración</span>
            </div>
          </nav>

          <button 
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 p-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-5 md:p-10 lg:p-14 w-full max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Hola, Administrador!
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              Gestiona los rescatados de hoy.
            </p>
          </div>
          
          <button 
            onClick={() => { setEditingAnimal(null); setIsModalOpen(true); }}
            className="hidden md:flex items-center gap-3 bg-brand-primary text-white py-4 px-8 rounded-2xl font-black shadow-lg hover:translate-y-[-2px] transition-all"
          >
            <Plus className="w-6 h-6" />
            Nuevo Animal
          </button>
        </header>

        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <Loader size="lg" />
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AnimalTable 
              animals={animals} 
              onEdit={(a) => { setEditingAnimal(a); setIsModalOpen(true); }} 
              onDelete={(id, url) => {/* Lógica */}} 
            />
          </motion.div>
        )}

        {/* FAB MÓVIL */}
        <button 
          onClick={() => { setEditingAnimal(null); setIsModalOpen(true); }}
          className="md:hidden fixed bottom-8 right-6 w-16 h-16 bg-brand-primary text-white rounded-full shadow-2xl flex items-center justify-center z-30 active:scale-90 transition-transform"
        >
          <Plus className="w-8 h-8" />
        </button>
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingAnimal ? "Editar Animal" : "Nuevo Animal"}
      >
        <AnimalForm 
          editingAnimal={editingAnimal} 
          onSuccess={() => { setIsModalOpen(false); refresh(); }} 
        />
      </Modal>
    </div>
  );
}