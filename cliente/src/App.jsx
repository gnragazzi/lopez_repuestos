import Lateral from "./componentes/Lateral";
import Barra_superior from "./componentes/Barra_superior";
import { Outlet } from "react-router-dom";
import icono_lopez  from "./assets/imagen_fondo/fondo_lopez.png";
import { FaTruckArrowRight } from "react-icons/fa6";


function App() {
  return (
    <>
    <header><Barra_superior /></header>
    <div className="container__barra_lateral">
      <div className="barra_lateral__menu-bar">
        <input className="checkbox_sidebar" type="checkbox" id="btn_checkbox"/>
        <label className="label_sidebar" for="btn_checkbox">
        <FaTruckArrowRight className="icono_sidebar"/>
        </label>
        <Lateral />
      </div>
      </div>
    <main>
      <div className="container">
        <div className="container__icono-fondo">
            <img src={icono_lopez} alt="icono_fondo" />
        </div>
        <div className="cuerpo"><Outlet /></div>
      </div>
    </main>
    </>
  );
}

export default App;
