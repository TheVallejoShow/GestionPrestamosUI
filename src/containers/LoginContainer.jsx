import LoginForm from "../components/organisms/LoginForm";

import useAuth from "../hooks/useAuth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginContainer () {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, loading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError(err?.response?.data?.message || "Credenciales inválidas");
    }
  };

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleLogin}
      error={error}
      loading={loading}
    />
  );
}
