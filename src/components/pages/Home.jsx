import HomeUser from "../organisms/HomeUser";
import HomeAdmin from "../organisms/HomeAdmin";

import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Bienvenido, {currentUser?.email}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
      <div>
        { currentUser.role === "admin" ? <HomeAdmin /> : <HomeUser />}
      </div>
    </div>
  );
}
