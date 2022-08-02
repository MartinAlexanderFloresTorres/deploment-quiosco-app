import { useContext } from "react";
import OrdenesContext from "../context/OrdenesProvider";

const useOrdenes = () => {
  return useContext(OrdenesContext);
};

export default useOrdenes;
