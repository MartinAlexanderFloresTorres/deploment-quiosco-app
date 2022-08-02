import React from "react";
import { formatearDinero } from "../helpers";

const Pedido = ({ item }) => {
  return (
    <div className="border p-2 rounded-md md:grid grid-cols-2 md:mb-2 mb-5  last:mb-0">
      <h2 className="pedido_titulo font-semibold text-sm">{item.nombre}</h2>
      <div className="pedido_dinero flex md:gap-4 gap-2 items-center">
        <div className="flex gap-1 items-center">
          <span className="font-semibold text-sm">{item.precio}</span>
          <span className="text-amber-500 font-bold mb-1">x</span>
          <span>{item.cantidad}</span>
        </div>
        <span className="flex items-center gap-1 text-center font-bold text-sm">
          Total:{" "}
          <span className="text-amber-500 font-bold">
            {formatearDinero(item.precio * item.cantidad)}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Pedido;
