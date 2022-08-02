import LayoutAdministracion from "../layout/LayoutAdministracion";
import Orden from "../components/Orden";
import useOrdenes from "../hooks/useOrdenes";
import PreloadOrdenes from "../components/PreloadOrdenes";

const Administracion = () => {
  const { pendientes, cargando } = useOrdenes();
  return (
    <LayoutAdministracion pagina={"Administración de pedidos"}>
      <section className="flex flex-col gap-5">
        {pendientes.length !== 0 &&
          pendientes.map((orden) => <Orden key={orden.id} orden={orden} />)}
        {cargando && (
          <>
            <PreloadOrdenes />
            <PreloadOrdenes />
            <PreloadOrdenes />
            <PreloadOrdenes />
          </>
        )}
        {!cargando && pendientes.length === 0 && (
          <h3 className="text-2xl mt-5 text-center">No hay Pedidos Aun</h3>
        )}
      </section>
    </LayoutAdministracion>
  );
};

export default Administracion;
