import { useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser, checkAuthSession } from "./authService";
import { AuthContext } from "./useAuth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading on initial mount
  const [error, setError] = useState(null);

  // Check for existing session on mount using the backend API!
  useEffect(() => {
    const checkSession = async () => {
      try {
        // If they have a valid cookie, this will succeed!
        const data = await checkAuthSession();
        setUser(data); 
      } catch (err) {
        // If the cookie is expired or missing, this fails and they stay logged out
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || "Failed to login");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await registerUser(name, email, password);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || "Failed to register");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error("Failed to logout", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
