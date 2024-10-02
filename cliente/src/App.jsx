import Lateral from "./componentes/Lateral";
import Barra_superior from "./componentes/Barra_superior";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <header><Barra_superior /></header>
    <div className="container__barra_lateral">
        <input className="button__checkbox" type="checkbox" id="button__desplegable"/>
        <label className="label__checkbox" htmlFor="button__desplegable" type="button">=</label>
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
