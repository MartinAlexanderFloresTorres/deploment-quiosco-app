import { useCallback } from "react";
import Link from "next/link";
import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

const Total = () => {
  const { nombre, setNombre, pedidos, pedirOrden, total, loadingOrden } =
    useQuiosco();

  const comprobarPedido = useCallback(() => {
    return (
      pedidos.length === 0 || nombre.length < 4 || nombre === "" || loadingOrden
    );
  }, [pedidos, nombre, loadingOrden]);

  return (
    <Layout pagina={"Total y Confirma Pedido"}>
      <h1 className="md:text-4xl text-3xl font-black">
        Total y Confirma Pedido
      </h1>
      <p className="md:text-2xl my-6">Confirma tu pedido a continuación</p>
      <form onSubmit={pedirOrden}>
        <div>
          <label htmlFor="nombre" className="text-slate-500 font-bold text-xl">
            Nombre
          </label>
          <input
            value={nombre}
            onInput={(e) => setNombre(e.target.value.trimStart())}
            type="text"
            id="nombre"
            className="bg-gray-100 outline-amber-400 block p-2 rounded-md mt-3 w-full lg:w-1/3"
          />
        </div>

        <div className="mt-5">
          <p>
            Total a pagar {""}:{" "}
            <span className="font-bold">{formatearDinero(total)}</span>
          </p>
        </div>
        <div className="mt-5">
          <input
            disabled={comprobarPedido()}
            className={`${
              comprobarPedido()
                ? "bg-indigo-400 cursor-not-allowed hover:bg-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
            }  transition-colors uppercase shadow-md px-5 py-2 rounded-md text-white font-bold`}
            type="submit"
            value={loadingOrden ? "Confirmando..." : "Confirmar Pedido"}
          />
        </div>
      </form>
      <Link href={"/administracion"}>
        <a className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer block w-fit fixed bottom-5 right-5 z-10 transition-colors uppercase shadow-md px-5 py-2 rounded-md text-white font-bold">
          Administrar Ordenes
        </a>
      </Link>
    </Layout>
  );
};

export default Total;
