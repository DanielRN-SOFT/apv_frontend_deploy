import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: "",
    pwd_nueva: "",
  });

  const { guardarPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    if (password.pwd_nueva.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener minimo 6 caracteres",
        error: true,
      });
      return;
    }

    const respuesta = await guardarPassword(password);
    setAlerta(respuesta);
  };

  const { msg } = alerta;
  return (
    <>
      <AdminNav />

      <h2 className="text-center font-black text-3xl mt-10">
        Cambiar Password
      </h2>
      <p className="text-center text-xl mt-5 mb-10">
        Modifica tu {""}{" "}
        <span className="text-indigo-600 font-bold">Contraseña aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow p-5 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                className="uppercase text-gray-500 font-bold"
                htmlFor="pwd_actual"
              >
                Contraseña actual
              </label>
              <input
                type="password"
                className="border border-gray-200 bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_actual"
                placeholder="Escribe tú contraseña actual"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label
                className="uppercase text-gray-500 font-bold"
                htmlFor="pwd_nueva"
              >
                Nueva contraseña
              </label>
              <input
                type="password"
                className="border border-gray-200 bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_nueva"
                placeholder="Escribe tú nueva contraseña"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            {msg && <Alerta alerta={alerta} />}

            <input
              value="Guardar Cambios"
              type="submit"
              className="bg-indigo-700 px-10 py-3 mt-5 text-white uppercase w-full font-bold rounded-lg cursor-pointer hover:bg-indigo-800 transition-colors"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
