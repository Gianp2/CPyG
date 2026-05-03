import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import Loader from "./components/ui/Loader";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
 * Wrapper de Suspense para páginas lazy
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
    element: <ProtectedRoute />, // ✔ ahora es un componente real separado
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