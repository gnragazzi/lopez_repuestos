import Lateral from "./componentes/Lateral";
import Barra_superior from "./componentes/Barra_superior";
import { Outlet } from "react-router-dom";
import icono_lopez  from "./assets/imagen_fondo/fondo_lopez.png"

function App() {
  return (
    <>
    <header><Barra_superior /></header>
    <div className="container__barra_lateral">
      <div className="barra_lateral__menu-bar"><nav><Lateral /></nav></div>
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
