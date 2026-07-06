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

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

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
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "admin/login", element: <AdminLogin /> },
          {
            element: <ProtectedRoute />,
            children: [
              { path: "admin/dashboard", element: <Dashboard /> },
            ],
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ]),
  []);

  return <RouterProvider router={router} />;
}