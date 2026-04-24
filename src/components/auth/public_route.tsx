import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth/auth_context";

export const PublicRoute = () => {
  const { isAuthenticated, checkingAuth } = useAuth();

  if (checkingAuth) return null;

  // We only redirect if they are logged in and try to hit Login/Signup
  // For standard "Public" pages like /books, we just let them through.
  return <Outlet />;
};