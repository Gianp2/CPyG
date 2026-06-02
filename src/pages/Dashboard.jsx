import { useState, useMemo } from "react";
import { useAnimals } from "../hooks/useAnimals";
import { authService } from "../services/authService";
import { animalService } from "../services/animalService";
import { useNavigate } from "react-router-dom";
import Modal from "../components/ui/Modal";
import Loader from "../components/ui/Loader";
import AnimalForm from "../admin/AnimalForm";
import AnimalTable from "../admin/AnimalTable";
import { Plus, LogOut, PawPrint, LayoutDashboard, Settings, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function Dashboard() {
  const { animals, loading, refresh } = useAnimals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredAnimals = useMemo(() => {
    return animals.filter((animal) => 
      animal.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [animals, searchTerm]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success("Sesión cerrada correctamente");
      navigate("/");
    } catch (e) {
      toast.error("Error al cerrar sesión");
    }
  };

  const handleDelete = async (animal) => {
    try {
      await animalService.delete(animal.id);
      toast.success("Animal eliminado correctamente");
      refresh();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error al eliminar el animal");
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col md:flex-row overflow-x-hidden relative"
      style={{ 
        background: "radial-gradient(circle at center, #2d4a2d 0%, #0a0e0a 100%)" 
      }}
    >
      {/* Textura de puntos sutil (igual que en login) */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", 
          backgroundSize: "20px 20px" 
        }}
      />

      {/* NAVBAR MÓVIL */}
      <div className="md:hidden flex items-center justify-between p-5 bg-white/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <PawPrint className="w-6 h-6 text-emerald-400" />
          <span className="font-black text-white tracking-tighter">P&G ADMIN</span>
        </div>
        
        <button 
          onClick={() => setIsMobileMenuOpen(true)} 
          className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl transition-colors"
        >
          <Menu size={20} className="text-white" />
        </button>
      </div>

      {/* SIDEBAR - Adaptado a tema oscuro */}
      <aside 
        className={`fixed top-0 right-0 z-[80] h-full w-[280px] p-4 transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:static md:h-screen md:w-80`}
      >
        <div className="h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[2rem] p-6 flex flex-col relative overflow-hidden">
          
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="md:hidden absolute top-6 left-6 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-3 mb-10 px-2 mt-12 md:mt-0">
            <div className="p-2 bg-emerald-700 rounded-xl text-white shadow-lg">
              <PawPrint className="w-6 h-6" />
            </div>
            <span className="text-xl font-black text-slate-800 dark:text-white tracking-tight">P&G Admin</span>
          </div>

          <nav className="flex-1 space-y-2">
            <div className="p-4 bg-emerald-700 text-white rounded-2xl flex items-center gap-3 font-bold shadow-xl">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </div>
            <div className="p-4 text-slate-400 flex items-center gap-3 font-semibold cursor-not-allowed">
              <Settings className="w-5 h-5" />
              <span>Configuración</span>
            </div>
          </nav>

          <button 
            onClick={handleLogout} 
            className="mt-auto flex items-center gap-3 p-4 text-slate-400 hover:text-red-400 font-bold transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[70] md:hidden" 
          />
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-5 md:p-10 lg:p-14 w-full max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Panel de Control</h1>
            <p className="text-white/70 font-medium">Gestiona tus rescatados por nombre.</p>
          </div>
          <button 
            onClick={() => { setEditingAnimal(null); setIsModalOpen(true); }} 
            className="hidden md:flex items-center gap-3 bg-emerald-700 text-white py-4 px-8 rounded-2xl font-black shadow-lg hover:scale-105 transition-all"
          >
            <Plus className="w-6 h-6" /> Nuevo Animal
          </button>
        </header>

        <section className="mb-8 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-emerald-400 transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="Escribe el nombre del animal para buscar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl shadow-sm focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all font-medium text-white placeholder:text-white/50"
          />
        </section>

        {loading ? (
          <div className="w-full h-64 flex flex-col items-center justify-center">
            <Loader size="lg" />
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {filteredAnimals.length > 0 ? (
              <AnimalTable 
                animals={filteredAnimals} 
                onEdit={(a) => { setEditingAnimal(a); setIsModalOpen(true); }} 
                onDelete={handleDelete} 
              />
            ) : (
              <div className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10">
                <p className="text-white/60 font-bold italic">No hay resultados para "{searchTerm}"</p>
              </div>
            )}
          </motion.div>
        )}

        <button 
          onClick={() => { setEditingAnimal(null); setIsModalOpen(true); }} 
          className="md:hidden fixed bottom-8 right-6 w-16 h-16 bg-emerald-700 text-white rounded-full shadow-2xl flex items-center justify-center z-30 active:scale-90 transition-transform"
        >
          <Plus className="w-8 h-8" />
        </button>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingAnimal ? "Editar Animal" : "Nuevo Animal"}>
        <AnimalForm editingAnimal={editingAnimal} onSuccess={() => { setIsModalOpen(false); refresh(); }} />
      </Modal>
    </div>
  );
}