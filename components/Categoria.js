import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({ categoria, setMenu }) => {
  const { categoriaActual, handleClickCategoria } = useQuiosco();
  const { nombre, icono, id } = categoria;
  return (
    <button
      onClick={() => {
        handleClickCategoria(id);
        setMenu(false);
      }}
      className={`${
        categoriaActual?.id == id && "bg-amber-400 "
      } flex items-center gap-4 w-full border md:p-5 p-2 hover:bg-amber-400 transition-colors`}
    >
      <Image
        width={70}
        height={70}
        src={`/assets/img/icono_${icono}.svg`}
        alt="Imagen icono"
      />
      <span className="text-2xl font-bold capitalize paso">{nombre}</span>
    </button>
  );
};

export default Categoria;
