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
        <div className="overlay__fondo"></div>
        <div className="cuerpo"><Outlet /></div>
      </div>
    </main>
    </>
  );
}

export default App;
