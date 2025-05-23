import { useState } from "react";

const mockUsers = [
  { email: "usuario@test.com", password: "123", role: "user" },
  { email: "admin@test.com", password: "123", role: "admin" },
];

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const foundUser = mockUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        setIsAuthenticated(true);
        setCurrentUser(foundUser);
      } else {
        throw new Error("Credenciales inválidas");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return {
    login,
    logout,
    isAuthenticated,
    currentUser,
    loading,
  };
}