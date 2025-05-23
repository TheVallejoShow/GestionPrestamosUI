import ErrorMessage from "../atoms/ErrorMessage";
import FormField from "../molecules/FormField";
import BtnLogin from "../atoms/BtnLogin";

export default function LoginForm ({ email, setEmail, password, setPassword, onSubmit, error, loading }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold">Iniciar sesión</h2>
        <p className="mb-6">Ingrese sus credenciales para acceder</p>

        <ErrorMessage message={error} />

        <FormField
          label="Correo electrónico"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@test.com"
          required
        />

        <FormField
          label="Contraseña"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
          required
        />

        <BtnLogin type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </BtnLogin>
      </form>
    </div>
  );
}