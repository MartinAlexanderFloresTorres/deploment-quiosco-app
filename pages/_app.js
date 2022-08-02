import { QuioscoProvider } from "../context/QuioscoProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { OrdenesProvider } from "../context/OrdenesProvider";

function MyApp({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <OrdenesProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={2000} />
      </OrdenesProvider>
    </QuioscoProvider>
  );
}

export default MyApp;
