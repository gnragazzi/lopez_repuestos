import Lateral from "./componentes/Lateral";
import Barra_superior from "./componentes/Barra_superior";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <header><Barra_superior /></header>
    <div className="container__barra_lateral">
      <div className="barra_lateral__menu-bar"><nav><Lateral /></nav></div>
      </div>
    
    <main>
      <div className="container">
        <div className="cuerpo"><Outlet /></div>
      </div>
    </main>
    </>
  );
}

export default App;
