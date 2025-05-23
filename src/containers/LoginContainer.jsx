import { useState } from "react";
import LoginForm from "../components/organisms/LoginForm";
import useAuth from "../hooks/useAuth";

export default function LoginContainer () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      alert("Login exitoso");
    } catch (err) {
      setError(err.message || "Error de autenticación");
    }
  };

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
    />
  );
}
