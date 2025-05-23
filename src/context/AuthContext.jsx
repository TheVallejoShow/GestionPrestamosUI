import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const mockUsers = [
  { email: "usuario@test.com", password: "123", role: "user" },
  { email: "admin@test.com", password: "123", role: "admin" },
];

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) throw new Error("Credenciales inválidas");
      setIsAuthenticated(true);
      setCurrentUser(user);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);