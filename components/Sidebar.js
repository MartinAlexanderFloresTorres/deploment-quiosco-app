import { useState } from "react";
import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import Categoria from "./Categoria";
import { useRouter } from "next/router";
import PreloadCategorias from "./PreloadCategorias";

const Sidebar = () => {
  const { categorias, cargando } = useQuiosco();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="sticky top-0 bg-white z-10 contenido_menu">
        <button className="pt-5" onClick={() => router.push("/")}>
          <Image
            width={300}
            height={100}
            src="/assets/img/logo.svg"
            alt="logo"
            priority
          />
        </button>
        <button className="p-3 menu mt-5" onClick={() => setMenu(!menu)}>
          {!menu ? (
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
          ) : (
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

      <nav className={`mt-10 categorias ${menu && "active"}`}>
        {categorias.length > 0 &&
          categorias.map((categoria) => (
            <Categoria
              key={categoria.id}
              setMenu={setMenu}
              categoria={categoria}
            />
          ))}
        {cargando && (
          <>
            <PreloadCategorias />
            <PreloadCategorias />
            <PreloadCategorias />
            <PreloadCategorias />
            <PreloadCategorias />
            <PreloadCategorias />
          </>
        )}
      </nav>
    </>
  );
};

export default Sidebar;
