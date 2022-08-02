import React from "react";
import Orden from "../components/Orden";
import PreloadOrdenes from "../components/PreloadOrdenes";
import useOrdenes from "../hooks/useOrdenes";
import LayoutAdministracion from "../layout/LayoutAdministracion";

const Entregados = () => {
  const { entregados, cargando } = useOrdenes();
  return (
    <LayoutAdministracion pagina={"Pedidos Entregados"}>
      <section className="flex flex-col gap-5">
        {entregados.length !== 0 &&
          entregados.map((orden) => <Orden key={orden.id} orden={orden} />)}

        {cargando && (
          <>
            <PreloadOrdenes />
            <PreloadOrdenes />
            <PreloadOrdenes />
            <PreloadOrdenes />
          </>
        )}
        {!cargando && entregados.length === 0 && (
          <h3 className="text-2xl mt-5 text-center">No hay Entregas Aun</h3>
        )}
      </section>
    </LayoutAdministracion>
  );
};

export default Entregados;
