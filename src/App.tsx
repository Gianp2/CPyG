import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import AppRouter from "./router";

export default function App() {
  const [mounted, setMounted] = useState<boolean>(false);
  
  // Estado para controlar el tema ("light" o "dark")
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light";
    }
    return "light";
  });

  // Evita problemas de hidratación en producción (Vercel)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Efecto que aplica los cambios en el HTML y localStorage cada vez que cambia el tema
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme, mounted]);

  // Escucha un evento global para cambiar el tema desde cualquier botón de la app
  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<"light" | "dark">;
      setTheme(customEvent.detail);
    };

    window.addEventListener("toggle-theme", handleThemeChange);
    return () => window.removeEventListener("toggle-theme", handleThemeChange);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        theme={theme}
      />
      <AppRouter />
    </>
  );
}