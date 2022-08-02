import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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
    } catch (error) {
      console.log(error);
    }
  };

  // eliminar
  const handleEliminar = async (id) => {
    try {
      await axios.delete(`/api/pedidos?id=${id}`);
      consultarOrdenerApi();
    } catch (error) {
      console.log(error);
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
