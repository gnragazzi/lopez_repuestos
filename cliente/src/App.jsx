import Lateral from "./componentes/Lateral";
import Barra_superior from "./componentes/Barra_superior";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="container">
      <Barra_superior />
      <Lateral />
      <div className="cuerpo">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
