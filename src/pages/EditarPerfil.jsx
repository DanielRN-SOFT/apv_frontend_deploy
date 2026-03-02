import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
const EditarPerfil = () => {
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});
  const { auth, actualizarPerfil } = useAuth();

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email } = perfil;

    if ([nombre, email].includes("")) {
      setAlerta({
        msg: "Email y Nombre son obligatorios",
        error: true,
      });

      return;
    }

    const resultado =await actualizarPerfil(perfil);
    setAlerta(resultado)
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="text-center font-black text-3xl mt-10">Editar Perfil</h2>
      <p className="text-center text-xl mt-5 mb-10">
        Modifica tu {""}{" "}
        <span className="text-indigo-600 font-bold">Informacion aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow p-5 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                className="uppercase text-gray-500 font-bold"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                type="text"
                className="border border-gray-200 bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label
                className="uppercase text-gray-500 font-bold"
                htmlFor="web"
              >
                Sitio Web
              </label>
              <input
                type="text"
                className="border border-gray-200 bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={perfil.web || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label
                className="uppercase text-gray-500 font-bold"
                htmlFor="telefono"
              >
                Telefono
              </label>
              <input
                type="tel"
                className="border border-gray-200 bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="telefono"
                value={perfil.telefono || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-5">
              <label
                className="uppercase text-gray-500 font-bold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                className="border border-gray-200 bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
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

export default EditarPerfil;
