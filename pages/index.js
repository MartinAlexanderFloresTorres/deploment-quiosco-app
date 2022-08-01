import Layout from "../layout/Layout";
import Producto from "../components/Producto";
import useQuiosco from "../hooks/useQuiosco";
import Spinner from "../components/Spinner";

export default function Home() {
  const { categoriaActual, cargando } = useQuiosco();
  return (
    <Layout pagina={`${categoriaActual?.nombre}`}>
      <h1 className="md:text-4xl text-3xl font-black">
        {categoriaActual?.nombre}
      </h1>
      <p className="text-xl font-semibold my-6">
        Elije y personaliza tu pedido a continuación
      </p>
      <div className="grid gap-4 productos-grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {categoriaActual?.productos?.map((producto) => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
      {cargando && (<Spinner /> )}
    </Layout>
  );
}
