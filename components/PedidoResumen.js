import Image from "next/image";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const PedidoResumen = ({ pedido }) => {
  const { imagen, nombre, precio, cantidad, id } = pedido;
  const { handleEditarCantidades, handleEliminarPedido } = useQuiosco();

  return (
    <article className="shadow-sm rounded-md border p-5 mb-3 pedido_resumen">
      <div className="imagen">
        <Image
          width={250}
          height={300}
          src={`/assets/img/${imagen}.jpg`}
          alt={`Imagen de producto ${nombre}`}
        />
      </div>
      <div className="resumen">
        <div>
          <p className="text-2xl font-bold">{nombre}</p>
          <p className="text-2xl font-semibold mt-2">Cantidad: {cantidad}</p>
          <p className="text-2xl font-bold mt-2 text-amber-500">
            Precio: {formatearDinero(precio)}
          </p>
          <p className="text-xl font-bold mt-2 text-gray-500">
            SubTotal: {formatearDinero(precio * cantidad)}
          </p>
        </div>
        <div className="botones">
          <button
            onClick={() => handleEditarCantidades(id)}
            className="bg-indigo-600 hover:bg-indigo-700  transition-colors uppercase shadow-md w-full flex gap-2 items-center justify-center px-5 py-2 rounded-md text-white font-bold cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>{" "}
            <span>Editar</span>
          </button>
          <button
            onClick={() => handleEliminarPedido(id)}
            className="bg-red-700 hover:bg-red-800  transition-colors uppercase shadow-md w-full flex gap-2 items-center justify-center px-5 py-2 rounded-md text-white font-bold cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span>Quitar</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default PedidoResumen;
