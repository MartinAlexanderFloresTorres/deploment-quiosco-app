import { useRouter } from "next/router";
import { pasos } from "../constants";

const Pasos = () => {
  const router = useRouter();

  const cancularProgreso = () => {
    let porcentaje = 0;
    if (router.pathname == "/") {
      porcentaje = 2;
    } else if (router.pathname == "/resumen") {
      porcentaje = 50;
    } else {
      porcentaje = 100;
    }
    return porcentaje + "%";
  };

  return (
    <>
      <div className="flex justify-between mb-1">
        {pasos.map((paso) => (
          <button
            onClick={() => router.push(paso.url)}
            className="text-2xl font-bold px-0 py-2 paso"
            key={paso.paso}
          >
            {paso.nombre}
          </button>
        ))}
      </div>
      <div className="bg-gray-100 mb-10">
        <div
          style={{ width: cancularProgreso() }}
          className={`rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white`}
        ></div>
      </div>
    </>
  );
};

export default Pasos;
