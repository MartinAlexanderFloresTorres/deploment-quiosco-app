import { useEffect } from "react";
import Head from "next/head";
import Modal from "react-modal";
import Sidebar from "../components/Sidebar";
import useQuiosco from "../hooks/useQuiosco";
import ModalProducto from "../components/ModalProducto";
import Pasos from "../components/Pasos";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: "900px",
    overflow: "auto",
  },
};
Modal.setAppElement("#__next");

const Layout = ({ children, pagina }) => {
  const { modal, setModal } = useQuiosco();

  useEffect(() => {
    document.querySelector("body").style.overflow = modal ? "hidden" : "auto";
  }, [modal]);
  return (
    <>
      <Head>
        <title>{`Menu - ${pagina}`}</title>
        <meta
          name="description"
          content="Quiosco Cafetería con next.js, react, tailwindcss y prisma"
        />
        <link rel="icon" href="/icono.svg" />
      </Head>

      <div className="md:flex contenido mx-auto">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5  md:h-screen md:overflow-y-auto">
          <Sidebar />
        </aside>
        <main className="md:w-8/12 xl:w-3/4  2xl:w-4/5 md:h-screen md:overflow-y-auto">
          <div className="md:p-10 p-5">
            <Pasos />
            {children}
          </div>
        </main>
      </div>
      {modal && (
        <Modal
          isOpen={modal}
          style={customStyles}
          onRequestClose={() => setModal(false)}
        >
          <ModalProducto />
        </Modal>
      )}
    </>
  );
};

export default Layout;
