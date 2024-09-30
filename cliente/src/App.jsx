import Lateral from "./componentes/Lateral";
import Barra_superior from "./componentes/Barra_superior";
import { Outlet } from "react-router-dom";
import fondo from "./assets/imagen_fondo/fondo_lopez.png";

function App() {
  return (
    <>
    <header><Barra_superior /></header>
    <nav><Lateral /></nav>
    <main>
      <div className="container">
      <div className="container overlay-fondo"></div>
        <div className="container__fondo">
          <img src={fondo} alt="fondo del container principal" />
          </div>
        <div className="cuerpo"><Outlet /></div>
      </div>
    </main>
    </>
  );
}

export default App;
