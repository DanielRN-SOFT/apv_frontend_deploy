import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

export const ConfirmarCuenta = () => {
  const params = useParams();
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        console.log(data);
        setAlerta({ msg: data.msg, error: false });
      } catch (error) {
        console.log(error);
        setAlerta({ msg: error.response.data.msg, error: true });
      }
      setCargando(false);
    };

    confirmarCuenta();
  }, []);
  return (
    <>
      <div>
        <h1 className="text-indigo-700 font-black text-6xl">
          Confirma tu cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="my-20 md:mt-15 shadow bg-white px-7 py-5 rounded-2xl">
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            className="block text-center text-gray-500  my-5 hover:text-indigo-600"
            to="/"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
