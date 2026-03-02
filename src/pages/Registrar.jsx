import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

export const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enviando formulario");
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    if (password != repetirPassword) {
      setAlerta({ msg: "Las contraseñas no son iguales", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña es muy corta, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    try {
      await clienteAxios.post("/veterinarios", { nombre, email, password });
      setAlerta({
        msg: "Creado correctamente, revisa tu email por favor",
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }

    console.log("Despues de la validacion");
  };

  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-700 font-black text-6xl">
          Crear una cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="my-20 md:mt-0 shadow bg-white px-7 py-5 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="uppercase text-gray-700 font-bold block text-xl"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-xl accent-indigo-700 p-3 mt-3 w-full bg-gray-50"
              placeholder="Tu nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-700 font-bold block text-xl"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              className="border border-gray-300 rounded-xl accent-indigo-700 p-3 mt-3 w-full bg-gray-50"
              placeholder="Email de Registro"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-700 font-bold block text-xl"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              className="border border-gray-300 rounded-xl accent-indigo-700 p-3 mt-3 w-full bg-gray-50"
              placeholder="Password de Registro"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-700 font-bold block text-xl"
              htmlFor="repetirPassword"
            >
              Repitir password
            </label>
            <input
              type="password"
              className="border border-gray-300 rounded-xl accent-indigo-700 p-3 mt-3 w-full bg-gray-50"
              placeholder="Repite tu password"
              id="repetirPassword"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          {/* ------------- Alerta en caso de error --------------- */}
          {msg && <Alerta alerta={alerta} />}

          <input
            className="bg-indigo-700 w-full py-3 px-10 text-white font-bold rounded-xl hover:bg-indigo-800 hover:cursor-pointer mt-5 uppercase md:w-auto"
            type="submit"
            value="Crear Cuenta"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center text-gray-500 my-5 hover:text-indigo-600"
            to="/"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
          <Link
            className="block text-center text-gray-500  my-5 hover:text-indigo-600"
            to="/olvide-password"
          >
            Olvide mi contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
