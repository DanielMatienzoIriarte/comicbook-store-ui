// src/hooks/auth/use_auth_actions.ts
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth/auth_context';
import { loginUser, registerUser, logoutUser } from '../../services/users/authentication';
import { userLoginInterface, userRegisterInterface } from '../../interfaces/interfaces';

export const useAuthActions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout: clearGlobalAuth } = useAuth();

  /**
   * Helper to handle the "Redirect Back" logic after auth
   */
  const redirectUser = () => {
    const origin = location.state?.from?.pathname || "/dashboard";
    navigate(origin, { replace: true });
  };

  /**
   * Handles User Login
   */
  const handleLogin = async (data: userLoginInterface) => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginUser(data);
      login(user); // Update Global Context
      redirectUser();
    } catch (err: any) {
      setError(err.message); // Captured from the thrown Error in the service
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles User Registration
   */
  const handleRegister = async (data: userRegisterInterface) => {
    setLoading(true);
    setError(null);
    try {
      const user = await registerUser(data);
      login(user); // Auto-login after registration
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles User Logout
   */
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
    } finally {
      // We clear local state even if the network call fails 
      // to ensure the UI doesn't get stuck.
      clearGlobalAuth();
      setLoading(false);
      navigate("/login", { replace: true });
    }
  };

  /**
   * Handles Google SSO
   */
  const handleGoogleLogin = () => {
    setLoading(true);
    initiateGoogleLogin();
  };

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    handleGoogleLogin,
    loading,
    error
  };
};