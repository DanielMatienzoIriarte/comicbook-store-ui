import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth/auth_context";

export const ProtectedRoute = () => {
  const { isAuthenticated, checkingAuth } = useAuth();
  const location = useLocation();

  if (checkingAuth) return null; // Or a <Spinner />

  return isAuthenticated 
    ? <Outlet /> 
    : <Navigate to="/login" state={{ from: location }} replace />;
};