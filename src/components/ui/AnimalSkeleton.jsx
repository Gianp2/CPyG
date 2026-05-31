export default function AnimalSkeleton() {
  return (
    <div 
      className="bg-white p-3 rounded-3xl shadow-sm animate-pulse border border-slate-100"
      aria-hidden="true" // Ocultamos el esqueleto a lectores de pantalla
    >
      {/* Espacio para la imagen: usamos aspect-square para coincidir con la card real */}
      <div className="aspect-square bg-slate-200 rounded-2xl w-full mb-3" />
      
      {/* Líneas para el texto */}
      <div className="space-y-2 px-1">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-100 rounded w-1/2" />
      </div>
    </div>
  );
}