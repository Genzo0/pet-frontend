import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export const ProtectedRoute = () => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return <Outlet />;
};
