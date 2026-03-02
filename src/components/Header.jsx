import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Header = () => {
  const { cerrarSesion } = useAuth();
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex justify-between items-center flex-col lg:flex-row">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">
          Administrador de Pacientes de {""}{" "}
          <span className="text-white font-black">Veterinaria</span>
        </h1>

        <nav className="flex flex-col lg:flex-row mt-5 lg:mt-0 items-center gap-4">
          <Link
            to="/admin"
            className="text-sm text-white font-bold uppercase hover:text-gray-300 transition-colors"
          >
            Pacientes
          </Link>
          <Link
            to="/admin/perfil"
            className="text-sm text-white font-bold uppercase hover:text-gray-300 transition-colors"
          >
            Perfil
          </Link>

          <button
            type="submit"
            className="text-sm text-white font-bold uppercase cursor-pointer hover:text-gray-300 transition-colors"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
