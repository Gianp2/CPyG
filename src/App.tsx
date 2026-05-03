import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import AppRouter from "./router";

export default function App() {
  const [mounted, setMounted] = useState(false);

  // Evita problemas de hidratación en producción (Vercel)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        theme="light"
      />
      <AppRouter />
    </>
  );
}