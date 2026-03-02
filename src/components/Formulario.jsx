import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
      console.log(fecha);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que no esten vacios los campos
    if (
      [
        nombre.trim() || email.trim() || propietario.trim() || sintomas.trim(),
      ].includes("")
    ) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
    setAlerta({ msg: "Guardado Correctamente" });
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
    setId(null);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Pacientes
      </h2>
      <p className="text-center text-xl mt-5 mb-10">
        Añade tus pacientes y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md px-5 py-10 mb-10 lg:mb-10 rounded-md"
      >
        <div className="mb-5">
          <label className="text-gray-700 font-bold uppercase" htmlFor="nombre">
            Nombre del Paciente
          </label>
          <input
            id="nombre"
            placeholder="Nombre de la mascota"
            className="border-2 border-gray-200 shadow w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-gray-700 font-bold uppercase"
            htmlFor="propietario"
          >
            Nombre del Propietario
          </label>
          <input
            id="propietario"
            placeholder="Nombre del propietario"
            className="border-2 border-gray-200 shadow w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="text-gray-700 font-bold uppercase" htmlFor="email">
            Email del Propietario
          </label>
          <input
            id="email"
            placeholder="Email del propietario"
            className="border-2 border-gray-200 shadow w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="text-gray-700 font-bold uppercase" htmlFor="fecha">
            Fecha Alta
          </label>
          <input
            id="fecha"
            placeholder="Nombre de la fecha"
            className="border-2 border-gray-200 shadow w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-gray-700 font-bold uppercase"
            htmlFor="sintomas"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los sintomas"
            className="border-2 border-gray-200 shadow w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        {msg && <Alerta alerta={alerta} />}

        <input
          className="bg-indigo-600 w-full p-3 mt-3 text-white font-bold uppercase cursor-pointer hover:bg-indigo-800 transition-colors"
          type="submit"
          value={id ? "Guardar Cambios" : "Agregar Paciente"}
        />
      </form>
    </>
  );
};

export default Formulario;
