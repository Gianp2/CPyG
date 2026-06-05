import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { PawPrint, Lock, Mail, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authService.login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Credenciales incorrectas. Verificá tu email y contraseña.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="h-[100dvh] w-full flex items-center justify-center p-4 overflow-hidden relative"
      style={{ 
        background: "radial-gradient(circle at center, #2d4a2d 0%, #0a0e0a 100%)" 
      }}
    >
      {/* Textura de puntos sutil */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", 
          backgroundSize: "20px 20px" 
        }}
      />

      {/* Link Volver al inicio */}
      <Link 
        to="/" 
        className="fixed top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors font-semibold group z-50"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Volver al inicio
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] shadow-2xl w-full max-w-md border border-white/20 relative overflow-hidden"
      >
        {/* Decoración */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-600/30 rounded-full -z-10 blur-3xl" />

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-emerald-700 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-6 shadow-xl rotate-6">
            <PawPrint className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Panel Admin</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium italic">
            Acceso restringido para personal
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-8 text-sm font-bold border border-red-100 dark:border-red-900 flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-4">
              Email 
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              <input 
                type="email" 
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 focus:ring-4 focus:ring-emerald-500/30 outline-none text-slate-800 dark:text-white font-medium transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@ejemplo.org"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-4">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              <input 
                type="password" 
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 focus:ring-4 focus:ring-emerald-500/30 outline-none text-slate-800 dark:text-white font-medium transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Botón simplificado como pediste */}
          <Button
            disabled={loading}
            className="w-full h-[68px] text-lg font-black shadow-lg hover:shadow-emerald-600/30 bg-emerald-700 hover:bg-emerald-600 transition-all flex items-center justify-center"
          >
            {loading ? (
              <span className="animate-pulse">Iniciando...</span>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>

        <p className="text-center mt-10 text-slate-400 text-xs font-medium italic">
          Protección de datos Como Perros & Gatos &copy; {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
}