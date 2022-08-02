import { useState } from "react";
import { formatearDinero, formatearFecha } from "../helpers";
import useOrdenes from "../hooks/useOrdenes";
import Pedido from "./Pedido";
import { useRouter } from "next/router";

const Orden = ({ orden }) => {
  const [loadingPut, setLoadingPut] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  
  const { pathname } = useRouter();
  const { handleEntregar, handleEliminar } = useOrdenes();
  const { nombre, id, fecha, total, pedido } = orden;

  const entregar = () => {
    handleEntregar(id);
    setLoadingPut(true);
  };
  const eliminar = () => {
    handleEliminar(id);
    setLoadingDelete(true);
  };
  return (
    <article className="bg-slate-50  p-5 rounded-md mb-5 border shadow-sm">
      <div className="flex items-center md:flex-row flex-col gap-1 justify-between mb-5">
        <span className="font-bold">{nombre}</span>
        <div className=" text-center md:w-fit w-full">
          <div>
            <span>{formatearFecha(fecha)}</span>
            <h2 className="text-center font-bold mb-2">
              Total a pagar:{" "}
              <span className="text-amber-500 font-bold">
                {formatearDinero(total)}
              </span>
            </h2>
          </div>
          <div className="ordenes_botones flex gap-2">
            {pathname === "/administracion" && (
              <button
                onClick={entregar}
                disabled={loadingPut}
                className="text-sm w-full rounded bg-green-500 hover:bg-green-600 transition-colors px-5 py-2 text-white border capitalize font-bold"
              >
                {loadingPut ? "Completando..." : "Completar"}
              </button>
            )}
            <button
              onClick={eliminar}
              disabled={loadingDelete}
              className="text-sm w-full rounded bg-red-600 hover:bg-red-700 transition-colors px-5 py-2 text-white border capitalize font-bold"
            >
              {loadingDelete ? "Eliminado..." : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white w-full p-5 border rounded-md overflow-auto scroll-auto">
        {pedido.map((item) => (
          <Pedido key={item.id} item={item} />
        ))}
      </div>
    </article>
  );
};

export default Orden;
