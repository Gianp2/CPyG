import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import AppRouter from "./router";

export default function App() {
  // Inicializamos el estado para detectar el tema preferido
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme as "light" | "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  // Aplicamos la clase al documento lo antes posible
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Manejo de eventos globales
  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<"light" | "dark">;
      setTheme(customEvent.detail);
      localStorage.setItem("theme", customEvent.detail);
    };

    window.addEventListener("toggle-theme", handleThemeChange);
    return () => window.removeEventListener("toggle-theme", handleThemeChange);
  }, []);

  return (
    <>
      {/* Toaster se mantiene reactivo al tema actual 
        Sin el if (!mounted) evitamos el parpadeo inicial
      */}
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