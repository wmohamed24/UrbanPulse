import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context state
interface AuthState {
  isLoggedIn: boolean;
  login: (userId: string, onTrip: boolean) => void;
  logout: () => void;
  userId: string | null;
  onTrip: boolean;
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

  const [onTrip, setOnTrip] = useState(
    localStorage.getItem("onTrip") === "true"
  );

  const login = (userId: string, onTrip: boolean) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userId", userId);
    localStorage.setItem("onTrip", onTrip.toString());
    setOnTrip(onTrip);
    setIsLoggedIn(true);
    setUserId(userId);
  };
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("onTrip");
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, onTrip, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
