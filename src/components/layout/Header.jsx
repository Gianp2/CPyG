import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import LogoImg from "../../img/logo.jpg"; 

const NAV_LINKS = [
  { name: "Inicio", href: "#inicio" },
  { name: "Donaciones", href: "#donations" },
  { name: "Contacto", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Se activa apenas se mueve 10px para un cambio rápido
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = isScrolled ? 70 : 90; 
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "h-20 bg-white shadow-lg border-none" // Limpio sin bordes residuales
          : "h-24 md:h-32 bg-transparent" 
      }`}
    >
      <nav className="max-w-7xl mx-auto h-full px-5 md:px-10 flex justify-between items-center">
        
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 md:gap-4 group">
          <div className={`relative overflow-hidden rounded-full transition-all duration-300 ${
            isScrolled ? "w-12 h-12" : "w-20 h-20 md:w-24 md:h-24"
          }`}>
            <img 
              src={LogoImg} 
              alt="Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className={`font-black tracking-tight text-brand-dark leading-tight transition-all duration-300 ${
              isScrolled ? "text-lg md:text-xl" : "text-xl md:text-3xl"
            }`}>
              Como Perros <span className="text-brand-primary">&</span> Gatos
            </h1>
            {!isScrolled && (
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-brand-primary/80 font-bold hidden xs:block">
                Rescate & Adopción
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-bold text-brand-dark/80 hover:text-brand-primary transition-colors relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          <Button
            onClick={(e) => scrollToSection(e, "#animals")}
            className={`px-6 rounded-full font-bold transition-all duration-300 transform active:scale-95 shadow-sm ${
              isScrolled ? "py-2 text-sm" : "py-3 text-base"
            }`}
          >
            Adoptar ahora
          </Button>
        </div>

        {/* Mobile Toggle Button - CORREGIDO SIN FONDO NI SOMBRA */}
        <button
          className="md:hidden p-2 text-brand-dark transition-colors focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 w-full h-screen bg-white md:hidden z-[60] flex flex-col"
          >
            <div className="flex justify-between items-center px-6 h-24 border-b border-slate-100">
               <span className="font-black text-xl text-brand-dark">Menú</span>
               <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-brand-dark"
               >
                <X size={28} />
               </button>
            </div>

            <div className="flex flex-col gap-4 p-8">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-3xl font-bold text-brand-dark py-4 border-b border-slate-50 flex justify-between items-center group"
                >
                  {link.name}
                  <span className="text-brand-primary">→</span>
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10"
              >
                <Button
                  onClick={(e) => scrollToSection(e, "#animals")}
                  className="w-full py-5 text-xl rounded-2xl"
                >
                  Adoptar ahora
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}