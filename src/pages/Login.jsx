import { useState } from "react";
import Alerta from "../components/Alerta";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth();

  // Redireccionamiento
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if ([email.trim(), password.trim()].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setAuth(data)
      navigate("/admin");
    } catch (error) {
      console.log(error);
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-700 font-black text-6xl">
          Inicia Sesión y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="my-20 md:mt-15 shadow bg-white px-7 py-5 rounded-2xl">
        <form action="" onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="uppercase text-gray-700 font-bold block text-xl"
              htmlFor=""
            >
              Email
            </label>
            <input
              type="email"
              className="border border-gray-300 rounded-xl accent-indigo-700 p-3 mt-3 w-full bg-gray-50"
              placeholder="Email de Registro"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-700 font-bold block text-xl"
              htmlFor=""
            >
              Password
            </label>
            <input
              type="password"
              className="border border-gray-300 rounded-xl accent-indigo-700 p-3 mt-3 w-full bg-gray-50"
              placeholder="Password de Registro"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {msg && <Alerta alerta={alerta} />}

          <input
            className="bg-indigo-700 w-full py-3 px-10 text-white font-bold rounded-xl hover:bg-indigo-800 hover:cursor-pointer mt-5 uppercase md:w-auto"
            type="submit"
            value="Iniciar Sesión"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center text-gray-500 my-5 hover:text-indigo-600"
            to="/registrar"
          >
            ¿No tienes una cuenta? Registrate
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

export default Login;
