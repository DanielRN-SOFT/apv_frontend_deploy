import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setTokenValido(true);
        setAlerta({ msg: "Ingresa tú nueva contraseña" });
      } catch (error) {
        setAlerta({ msg: "Hubo un error con el enlace", error: true });
      }
    };

    comprobarToken();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password.length === 0) {
      setAlerta({ msg: "Agrega una contraseña valida", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe ser minimo de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({ msg: data.msg });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-700 font-black text-6xl">
          Restablece tu <span className="text-black">contraseña</span> y no
          Pierdas Acceso tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="my-20 md:mt-15 shadow bg-white px-7 py-5 rounded-2xl">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit} action="">
              <div className="my-5">
                <label
                  className="uppercase text-gray-700 font-bold block text-xl"
                  htmlFor="password"
                >
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  className="border border-gray-300 rounded-xl accent-indigo-700 p-3 mt-3 w-full bg-gray-50"
                  placeholder="Tu Nueva Contraseña"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <input
                className="bg-indigo-700 w-full py-3 px-10 text-white font-bold rounded-xl hover:bg-indigo-800 hover:cursor-pointer mt-5 uppercase md:w-auto"
                type="submit"
                value="Guardar"
              />
            </form>
          </>
        )}

        {passwordModificado && (
          <Link
            className="block text-center my-5 text-gray-500 hover:text-blue-800"
            to="/"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
