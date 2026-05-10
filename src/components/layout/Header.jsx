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
      setIsScrolled(window.scrollY > 20);
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
      const offset = isScrolled ? 80 : 100; 
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "h-20 bg-white/95 backdrop-blur-md shadow-md" 
          : "h-24 md:h-32 bg-transparent" 
      }`}
    >
      <nav className="max-w-7xl mx-auto h-full px-5 md:px-10 flex justify-between items-center">
        
        {/* Logo & Brand - MOVIMIENTO ELIMINADO */}
        <Link to="/" className="flex items-center gap-3 md:gap-4 group">
          <div className={`relative overflow-hidden rounded-full border-2 border-transparent ${
            isScrolled ? "w-14 h-14" : "w-20 h-20 md:w-24 md:h-24"
          }`}>
            <img 
              src={LogoImg} 
              alt="Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className={`font-black tracking-tight text-brand-dark leading-tight transition-all duration-500 ${
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

        {/* Mobile Toggle Button */}
        <button
          className={`md:hidden p-2.5 rounded-xl transition-colors ${
            isScrolled ? "bg-brand-primary/10 text-brand-primary" : "bg-white/20 text-brand-dark backdrop-blur-sm"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-full h-screen bg-white md:hidden z-[60] flex flex-col"
          >
            <div className="flex justify-between items-center px-6 h-24 border-b border-slate-50">
               <span className="font-black text-xl text-brand-dark">Menú</span>
               <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-slate-100 rounded-full"
               >
                <X size={24} />
               </button>
            </div>

            <div className="flex flex-col gap-4 p-8">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-3xl font-bold text-brand-dark py-4 border-b border-slate-50 flex justify-between items-center group"
                >
                  {link.name}
                  <span className="text-brand-primary opacity-0 group-hover:opacity-100">→</span>
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
                  className="w-full py-5 text-xl rounded-2xl shadow-xl shadow-brand-primary/20"
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