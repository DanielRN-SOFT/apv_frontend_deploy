const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${alerta.error ? "from-red-400 to-red-600" : " from-indigo-400 to-indigo-600"} bg-linear-to-br text-center text-white font-bold p-3 rounded-xl uppercase text-sm mb-2`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
