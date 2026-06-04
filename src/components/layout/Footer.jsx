import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white/30 backdrop-blur-sm border-t border-brand-border h-16 flex items-center">
      {/* Se eliminó justify-between para poder centrar el contenido */}
      <div className="max-w-7xl mx-auto px-12 w-full flex justify-center items-center text-[10px] font-bold uppercase tracking-widest opacity-60 text-brand-dark">
        
        {/* BOTÓN ADMIN ESCONDIDO AQUÍ */}
        <Link 
          to="/admin/login" 
          className="hover:opacity-100 transition-opacity cursor-default"
        >
          © {new Date().getFullYear()} Como Perros & Gatos
        </Link>
        
      </div>
    </footer>
  );
}