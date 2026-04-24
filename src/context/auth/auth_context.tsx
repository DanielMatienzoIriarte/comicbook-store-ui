import axios from 'axios';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { userInterface, AuthContextType } from '../../interfaces/interfaces';
import { checkAuthStatus } from '../../services/users/authentication';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userInterface | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // On mount, check if the browser has a valid session cookie
  useEffect(() => {
  const initAuth = async () => {
    try {
      const userData = await checkAuthStatus(); // Call the service
      setUser(userData); // Found a valid cookie!
    } catch {
      setUser(null); // No cookie or expired
    } finally {
      setCheckingAuth(false); // Stop the loading spinner
    }
  };

  initAuth();
}, []);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('auth_success') === 'true') {
    // If the backend redirected us back with a success flag, 
    // re-verify the session to get the user data
    checkAuthStatus().then(setUser);
    // Clean the URL bar
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}, []);

  const login = (userData: userInterface) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // The actual cookie deletion happens on the server during the logout request
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      checkingAuth 
    }}>
      {!checkingAuth && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};