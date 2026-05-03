import { lazy, Suspense } from "react";
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

/**
 * Loading UI centralizado
 */
const LoadingScreen = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white">
    <Loader />
  </div>
);

/**
 * Wrapper de protección de rutas
 * (IMPORTANTE: se mantiene simple para evitar side effects raros)
 */
const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
};

/**
 * Layout base con Suspense global
 */
const AppLayout = ({ children }) => {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <AppLayout>
        <AdminLogin />
      </AppLayout>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <AppLayout>
            <Dashboard />
          </AppLayout>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <AppLayout>
        <NotFound />
      </AppLayout>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}