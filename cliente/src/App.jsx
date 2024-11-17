import Lateral from "./componentes/Lateral";
import Barra_superior from "./componentes/Barra_superior";
import { Outlet } from "react-router-dom";
import icono_lopez from "./assets/imagen_fondo/fondo_lopez.png";
import { FaTruckArrowRight } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./componentes/Modal";
import { useEffect } from "react";
import useAxiosPrivado from "./utilidades/useAxiosPrivado";
import { useContextoGlobal } from "./Contexto";

function App() {
  const {
    dispatch_vencimientos: dispatch,
    acciones_vencimientos: { CARGAR_VENCIMIENTOS },
  } = useContextoGlobal();
  const axiosPrivado = useAxiosPrivado();
  useEffect(() => {
    //PREGUNTAR AL SERVIDOR POR VENCIMIENTOS CERCANOS
    axiosPrivado
      .get("/vencimientos")
      .then((res) => {
        dispatch({ tipo: CARGAR_VENCIMIENTOS, payload: res.data });
      })
      .catch((error) => console.log(error.message));
  }, [CARGAR_VENCIMIENTOS, axiosPrivado, dispatch]);
  return (
    <>
      <Modal />
      <header>
        <Barra_superior />
        <ToastContainer />
      </header>
      <div className="container__barra_lateral">
        <div className="barra_lateral__menu-bar">
          <input
            className="checkbox_sidebar"
            type="checkbox"
            id="btn_checkbox"
          />
          <label className="label_sidebar" htmlFor="btn_checkbox">
            <FaTruckArrowRight className="icono_sidebar" />
          </label>
          <Lateral />
        </div>
      </div>
      <main>
        <div className="container">
          <div className="container__icono-fondo">
            <img src={icono_lopez} alt="icono_fondo" />
          </div>
          <div className="cuerpo">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
