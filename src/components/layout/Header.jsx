import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const NAV_LINKS = [
  { name: "Inicio", href: "#inicio" },
  { name: "Donaciones", href: "#donations" },
  { name: "Contacto", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/50 backdrop-blur-md border-b border-brand-border py-4" : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform shadow-sm">
            <PawPrint className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-dark">
             Perros <span className="text-brand-primary">&</span> Gatos
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-brand-dark opacity-80 hover:text-brand-primary hover:opacity-100 transition-all"
            >
              {link.name}
            </a>
          ))}
          <Button onClick={(e) => scrollToSection(e, "#animals")} className="px-6 py-2.5 text-sm">Adoptar ahora</Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-brand-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-bg border-b border-brand-border p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-lg font-medium text-brand-dark border-b border-brand-border/50 pb-2"
              >
                {link.name}
              </a>
            ))}
            <Button onClick={(e) => scrollToSection(e, "#animals")} className="w-full mt-2">Adoptar ahora</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
