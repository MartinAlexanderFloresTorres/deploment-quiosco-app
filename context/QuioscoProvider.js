import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);

  // consultas
  const obtenerCategorias = async () => {
    try {
      const { data } = await axios("/api/categorias");
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect
  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const totalPagar = pedidos.reduce(
      (total, pedido) => pedido.precio * pedido.cantidad + total,
      0
    );
    setTotal(totalPagar);
  }, [pedidos]);
  // funciones
  const handleClickCategoria = (id) => {
    const categoria = categorias.find((cat) => cat.id === id);
    setCategoriaActual(categoria);
    router.push("/");
  };

  const handleClickProducto = (product) => {
    setProducto(product);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedidos.some((ped) => ped.id === producto.id)) {
      const pedidosActualizados = pedidos.map((ped) =>
        ped.id == producto.id ? producto : ped
      );
      setPedidos(pedidosActualizados);
      toast.success("Guardado Correctamente", {
        autoClose: 2000,
      });
    } else {
      setPedidos([...pedidos, producto]);
      toast.success("Agregado al Pedido", {
        autoClose: 2000,
      });
    }
    setModal(false);
  };

  const handleEditarCantidades = (id) => {
    const pedido = pedidos.find((pedido) => pedido.id === id);
    setProducto(pedido);
    setModal(true);
  };
  const handleEliminarPedido = (id) => {
    const pedidosActualizados = pedidos.filter((pedido) => pedido.id !== id);
    setPedidos(pedidosActualizados);
    toast.success("Pedido Eliminado", {
      autoClose: 2000,
    });
  };
  const pedirOrden = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/ordenes", {
        nombre,
        fecha: Date.now().toString(),
        total,
        pedidos,
      });
      setCategoriaActual(categorias[0]);
      setPedidos([]);
      setNombre("");
      toast.success("Pedido Realizado Correctamente", {
        autoClose: 2000,
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleClickProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedidos,
        setModal,
        handleEditarCantidades,
        handleEliminarPedido,
        nombre,
        setNombre,
        pedirOrden,
        total,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
