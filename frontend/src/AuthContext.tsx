import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context state
interface AuthState {
  isLoggedIn: boolean;
  login: (userId: string) => void;
  logout: () => void;
  userId: string | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthState>(null!);

// Define a hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Define the types for AuthProvider's props
interface AuthProviderProps {
  children: ReactNode; // This tells TypeScript that children is a ReactNode
}

// Define a provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Boolean(localStorage.getItem("isLoggedIn"))
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );

  const login = (userId: string) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userId", userId);
    setIsLoggedIn(true);
    setUserId(userId);
  };
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
