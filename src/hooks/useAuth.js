import { useState } from "react";

const mockUsers = [
  { email: "usuario@test.com", password: "123", role: "user" },
  { email: "admin@test.com", password: "123", role: "admin" },
];

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (!foundUser) {
        throw new Error("Credenciales inválidas");
      }
      setIsAuthenticated(true);
      setUser(foundUser);
      return foundUser;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, isAuthenticated, user };
}