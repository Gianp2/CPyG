import { PawPrint, Instagram, Facebook, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white/30 backdrop-blur-sm border-t border-brand-border h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-12 w-full flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest opacity-60 text-brand-dark">
        
        <span>© {new Date().getFullYear()} Como Perros & Gatos</span>

        <div className="flex gap-6 mt-2 md:mt-0 items-center">

          <a
            href="https://www.instagram.com/comoperrosygatosarmstrong/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors flex items-center gap-1"
          >
            <Instagram className="w-3.5 h-3.5" />
            Instagram
          </a>

          <a
            href="https://www.facebook.com/comoperrosygatos.adopciones.3?locale=es_LA"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors flex items-center gap-1"
          >
            <Facebook className="w-3.5 h-3.5" />
            Facebook
          </a>

          <a
            href="https://wa.me/5493471347911"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5" />
            WhatsApp
          </a>

          <Link
            to="/admin/login"
            className="text-brand-primary cursor-pointer hover:opacity-80 transition"
          >
            Acceso Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}