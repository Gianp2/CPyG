import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet
} from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import Loader from "./components/ui/Loader";

// Lazy load páginas
const Home = lazy(() => import("./pages/Home"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Optimizado: Un componente de carga más ligero
const LoadingScreen = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white" aria-live="polite">
    <Loader />
  </div>
);

// Componente para proteger rutas y envolver con Suspense de forma global
const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Outlet permite renderizar los hijos de la ruta
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    // Envolvemos todo en un Suspense de nivel superior para evitar parpadeos
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <AdminLogin />
      </Suspense>
    ),
  },
  {
    // Usamos el layout de ProtectedRoute para el Dashboard
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Dashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}