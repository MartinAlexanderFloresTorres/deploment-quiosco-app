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
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [loadingOrden, setLoadingOrden] = useState(false);

  const router = useRouter();

  // consultas
  const obtenerCategorias = async () => {
    try {
      setCargando(true);
      const { data } = await axios("/api/categorias");
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
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
      setLoadingOrden(true);
      await axios.post("/api/ordenes", {
        nombre,
        fecha: new Date(),
        total,
        pedidos,
      });
      setCategoriaActual(categorias[0]);
      setPedidos([]);
      setNombre("");
      toast.success("Pedido Realizado Correctamente", {
        autoClose: 2000,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Intente Nuevamente", {
        autoClose: 2000,
      });
    } finally {
      setLoadingOrden(false);
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
        cargando,
        loadingOrden,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
