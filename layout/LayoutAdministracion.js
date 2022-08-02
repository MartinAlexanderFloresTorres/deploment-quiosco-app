import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const LayoutAdministracion = ({ children, pagina }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <Head>
        <title>{`${pagina}`}</title>
        <meta
          name="description"
          content="Quiosco Cafetería con next.js, react, tailwindcss y prisma"
        />
        <link rel="icon" href="/icono.svg" />
      </Head>

      <main className="contenido">
        <div className="w-full mb-5 text-center">
          <button className="pt-5 " onClick={() => router.push("/")}>
            <Image
              width={300}
              height={100}
              src="/assets/img/logo.svg"
              alt="logo"
              priority
            />
          </button>
        </div>
        <header className="flex px-5 pt-2 gap-1 items-center ordenes_header">
          <button
            onClick={() => router.push("administracion")}
            className={`${
              pathname == "/administracion" &&
              "bg-amber-500 hover:bg-amber-600 text-white"
            } w-full transition-colors px-5 py-2 border uppercase font-bold md:text-lg text-sm`}
          >
            Pendientes
          </button>
          <button
            onClick={() => router.push("entregados")}
            className={`${
              pathname == "/entregados" &&
              "bg-amber-500 hover:bg-amber-600 text-white"
            } w-full transition-colors px-5 py-2 border uppercase font-bold md:text-lg text-sm`}
          >
            Entregados
          </button>
        </header>

        <div className="p-5">{children}</div>
      </main>
    </>
  );
};

export default LayoutAdministracion;
