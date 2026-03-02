import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();

  return (
    <>
      {pacientes.length ? (
        <>
          {" "}
          <h2 className="font-black text-3xl text-center">
            Listado de pacientes
          </h2>
          <p className="text-center text-xl mt-5 mb-10">
            Administra tus {""}{" "}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          <div className="xl:grid xl:grid-cols-2">
            {pacientes.map((paciente) => (
              <Paciente key={paciente._id} paciente={paciente} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
          <p className="text-center text-xl mt-5 mb-10">
            Comienza agregando tus pacientes {""}{" "}
            <span className="text-indigo-600 font-bold">
              y apareceran en este lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;
