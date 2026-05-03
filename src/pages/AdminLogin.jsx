import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
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
    <div className="min-h-screen bg-brand-beige/30 flex items-center justify-center p-6">
      <Link to="/" className="fixed top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors font-semibold group">
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Volver al inicio
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl w-full max-w-md border border-brand-accent/50 relative overflow-hidden"
      >
        {/* Decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent rounded-full -z-10 blur-2xl" />

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-brand-primary rounded-[2rem] flex items-center justify-center text-white mx-auto mb-6 shadow-xl rotate-6">
            <PawPrint className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Panel Admin</h1>
          <p className="text-slate-500 mt-2 font-medium italic">Acceso restringido para personal</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-8 text-sm font-bold border border-red-100 flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-4">Email Corporativo</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary opacity-50" />
              <input 
                type="email" 
                required
                className="w-full pl-12 pr-4 py-4 bg-brand-beige/20 rounded-2xl border border-brand-accent/50 focus:ring-4 focus:ring-brand-accent outline-none text-slate-700 font-medium transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@ejemplo.org"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-4">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary opacity-50" />
              <input 
                type="password" 
                required
                className="w-full pl-12 pr-4 py-4 bg-brand-beige/20 rounded-2xl border border-brand-accent/50 focus:ring-4 focus:ring-brand-accent outline-none text-slate-700 font-medium transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button 
            disabled={loading} 
            className="w-full py-5 text-lg font-black shadow-lg hover:shadow-brand-primary/20"
          >
            {loading ? <Loader /> : "Iniciar Sesión"}
          </Button>
        </form>

        <p className="text-center mt-10 text-slate-400 text-xs font-medium italic">
          Protección de datos Como Perros & Gatos &copy; {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
}
