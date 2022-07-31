import PedidoResumen from "../components/PedidoResumen";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

const Resumen = () => {
  const { pedidos } = useQuiosco();
  return (
    <Layout pagina={"Resumen"}>
      <h1 className="md:text-4xl text-3xl font-black">Resumen</h1>
      <p className="md:text-2xl mt-2 mb-8">Revisa tu pedido</p>
      {pedidos.length === 0 ? (
        <p className="text-center md:text-2xl">No hay elementos en el pedido</p>
      ) : (
        <div className="resumen_container">
          {pedidos.map((pedido) => (
            <PedidoResumen key={pedido.id} pedido={pedido} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Resumen;
