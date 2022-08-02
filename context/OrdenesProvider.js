import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const OrdenesContext = createContext();

const OrdenesProvider = ({ children }) => {
  const [pendientes, setPendientes] = useState([]);
  const [entregados, setEntregados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { pathname } = useRouter();

  const consultarOrdenes = async () => {
    try {
      setCargando(true);
      const { data } = await axios("/api/pedidos");
      const pendient = data.filter((orden) => orden.entregado == false);
      setPendientes(pendient);

      const entregad = data.filter((orden) => orden.entregado == true);
      setEntregados(entregad);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const consultarOrdenerApi = async () => {
    try {
      const { data } = await axios("/api/pedidos");
      const pendient = data.filter((orden) => orden.entregado == false);
      setPendientes(pendient);

      const entregad = data.filter((orden) => orden.entregado == true);
      setEntregados(entregad);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    consultarOrdenes();
  }, []);

  useEffect(() => {
    if (pathname === "/administracion") {
      consultarOrdenerApi();
    }
  }, [pathname]);

  // entregar
  const handleEntregar = async (id) => {
    try {
      await axios.put("/api/pedidos", { id });
      consultarOrdenerApi();
      toast.success("Completado Correctamente", {
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Intente Nuevamente", {
        autoClose: 2000,
      });
    }
  };

  // eliminar
  const handleEliminar = async (id) => {
    try {
      await axios.delete(`/api/pedidos?id=${id}`);
      consultarOrdenerApi();
      toast.success("Eliminado Correctamente", {
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Intente Nuevamente", {
        autoClose: 2000,
      });
    }
  };

  return (
    <OrdenesContext.Provider
      value={{
        pendientes,
        entregados,
        cargando,
        handleEntregar,
        handleEliminar,
      }}
    >
      {children}
    </OrdenesContext.Provider>
  );
};

export { OrdenesProvider };
export default OrdenesContext;
