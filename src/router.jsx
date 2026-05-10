import { lazy, Suspense, useMemo } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import Loader from "./components/ui/Loader";
import { useAuth } from "./hooks/useAuth";

// Lazy pages
const Home = lazy(() => import("./pages/Home"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const LoadingScreen = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white">
    <Loader />
  </div>
);

// Componente para proteger rutas
const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
};

// Layout optimizado: El Suspense envuelve al Outlet para que 
// cualquier cambio de ruta dispare el fallback automáticamente
const RootLayout = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Outlet />
  </Suspense>
);

export default function AppRouter() {
  const router = useMemo(() =>
    createBrowserRouter([
      {
        path: "/",
        element: <RootLayout />, // Centralizamos el Suspense aquí
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "admin/login",
            element: <AdminLogin />,
          },
          {
            element: <ProtectedRoute />, // Protección de rutas
            children: [
              {
                path: "admin/dashboard",
                element: <Dashboard />,
              },
            ],
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ]),
  []);

  return <RouterProvider router={router} />;
}