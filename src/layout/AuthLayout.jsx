// rafce -> extension de autocompletado
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 p-5 gap-10 items-center ">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
