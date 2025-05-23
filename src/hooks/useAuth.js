import { useState } from "react";

const mockUsers = [
  { email: "usuario@test.com", password: "123", role: "user" },
  { email: "admin@test.com", password: "123", role: "admin" },
];

export default function useAuth() {
  const [loading, setLoading] = useState(false);

  const login = (email, password) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        setLoading(false);
        if (user) {
          resolve(user);
        } else {
          reject(new Error("Correo o contraseña incorrectos"));
        }
      }, 1000);
    });

  return { login, loading };
}