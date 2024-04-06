import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context state
interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
