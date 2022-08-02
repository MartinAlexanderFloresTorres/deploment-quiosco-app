import { useState, useEffect } from "react";
import Image from "next/image";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const ModalProducto = () => {
  const { producto, handleChangeModal, handleAgregarPedido, pedidos } =
    useQuiosco();
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  const disminuir = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };
  const aumentar = () => {
    if (cantidad < 10) {
      setCantidad(cantidad + 1);
    }
  };

  useEffect(() => {
    // comprobar si el modal actual esta en el pedido
    if (pedidos.some((pedido) => pedido.id == producto.id)) {
      const productoCantidad = pedidos.find(
        (pedido) => pedido.id == producto.id
      );
      setEdicion(true);
      setCantidad(productoCantidad.cantidad);
    }
  }, [producto, pedidos]);

  return (
    <div className="flex md:flex-row md:gap-8 gap-1 md:text-left flex-col text-center">
      <div className="xl:w-1/3">
        <Image
          width={300}
          height={400}
          src={`/assets/img/${producto?.imagen}.jpg`}
          alt={`Producto ${producto?.nombre}`}
        />
      </div>
      <div className="md:w-2/3">
        <div className="w-full text-right">
          <button
            title="Cerrar"
            className="absolute top-1 right-1 bg-white rounded-full p-2"
            onClick={() => handleChangeModal()}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h2 className="md:text-3xl text-xl font-bold mt-5">
          {producto?.nombre}
        </h2>
        <p className="mt-5 font-black md:text-5xl text-2xl text-amber-500">
          {formatearDinero(producto?.precio)}
        </p>
        <div className="flex gap-3 mt-5 items-center md:justify-start justify-center">
          <button title="Disminuir" onClick={disminuir}>
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
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="font-semibold text-2xl mb-1 select-none">{cantidad}</p>
          <button title="Aumentar" onClick={aumentar}>
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
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={() => handleAgregarPedido({ ...producto, cantidad })}
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700  md:w-auto w-full transition-colors px-5 py-2 cursor-pointer mt-5 font-bold uppercase rounded text-white"
        >
          {!edicion ? "Añadir al pedido" : "Guardar Cambios"}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
