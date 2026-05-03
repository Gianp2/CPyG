import { Toaster } from 'sonner';
import AppRouter from "./router";

export default function App() {
  return (
    <>
      {/* Usamos el Toaster de Sonner para que coincida con tus formularios */}
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