import { Link } from "react-router-dom";
import { PawPrint, Home } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-beige/20 p-6 text-center">
      <div className="w-32 h-32 bg-brand-primary rounded-[3rem] flex items-center justify-center text-white mb-10 shadow-3xl shadow-brand-primary/20 rotate-12">
        <PawPrint className="w-16 h-16" />
      </div>
      <h1 className="text-7xl font-black text-slate-800 mb-4 tracking-tighter">404</h1>
      <p className="text-2xl text-slate-500 font-serif italic mb-12">¡Ups! Parece que este camino no tiene huellas.</p>
      <Link to="/">
        <Button className="flex items-center gap-3 py-4 px-10">
          <Home className="w-5 h-5" />
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
}
