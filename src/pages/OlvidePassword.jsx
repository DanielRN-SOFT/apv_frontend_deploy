import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

export const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    if (email === "") {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password",
        { email },
      );
      setAlerta({ msg: data.msg, error: false });
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
          Recupera tu acceso y no Pierdas tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="my-20 md:mt-15 shadow bg-white px-7 py-5 rounded-2xl">
        <form onSubmit={handleSubmit} action="">
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

          {msg && <Alerta alerta={alerta} />}

          <input
            className="bg-indigo-700 w-full py-3 px-10 text-white font-bold rounded-xl hover:bg-indigo-800 hover:cursor-pointer mt-5 uppercase md:w-auto"
            type="submit"
            value="Enviar Instrucciones"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center text-gray-500  my-5 hover:text-indigo-600"
            to="/registrar"
          >
            ¿No tienes una cuenta? Registrate
          </Link>
          <Link
            className="block text-center text-gray-500 my-5 hover:text-indigo-600"
            to="/"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
