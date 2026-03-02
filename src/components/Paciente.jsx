import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
  const {setEdicion, eliminarPaciente} = usePacientes();

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-CO', {dateStyle: 'long'}).format(nuevaFecha);
  }

  const { nombre, propietario, email, fecha, sintomas, _id } = paciente;
  return (
    <>
      <div className="m-5 bg-whit shadow-xl bg-white p-5 rounded-xl">
        <p className="font-bold uppercase text-indigo-800 my-2">
          Nombre:{" "}
          <span className="text-black font-normal normal-case">{nombre}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">
          Propietario:{" "}
          <span className="text-black font-normal normal-case">
            {propietario}
          </span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">
          Propietario:{" "}
          <span className="text-black font-normal normal-case">{email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">
          Fecha:{" "}
          <span className="text-black font-normal normal-case">
            {formatearFecha(fecha)}
          </span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">
          Sintomas:{" "}
          <span className="text-black font-normal normal-case">{sintomas}</span>
        </p>

        <div className="flex justify-between">
          <button className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-2 rounded-lg font-bold cursor-pointer uppercase"
          onClick={() => setEdicion(paciente)}>
            Editar
          </button>
          <button className="mt-3 bg-red-600 hover:bg-red-700 text-white px-10 py-2 rounded-lg font-bold cursor-pointer uppercase"
          onClick={() => eliminarPaciente(_id)}>
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
};

export default Paciente;
