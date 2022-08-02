import Image from "next/image";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Producto = ({ producto }) => {
  const { nombre, imagen, precio } = producto;
  const { handleClickProducto, handleChangeModal } = useQuiosco();
  return (
    <div className="border rounded-md p-3 text-center productos-item">
      <div className="productos-imagen">
        <Image
          src={`/assets/img/${imagen}.jpg`}
          width={400}
          height={500}
          alt="Imagen"
          className="rounded-md"
          priority
        />
      </div>
      <div className="pt-5 producto-info">
        <h3 className="text-xl font-bold">{nombre}</h3>
        <p className="font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>
        <button
          type="button"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors px-5 py-2 rounded text-white uppercase font-bold"
          onClick={() => {
            handleChangeModal();
            handleClickProducto(producto);
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Producto;
