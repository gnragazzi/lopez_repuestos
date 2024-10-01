import { Link, Outlet } from "react-router-dom";

function Viajes() {
  return (
    <div>
      <Outlet></Outlet>
      <h1>Viajes</h1>
      <Link to="cargar_viaje">Nuevo Viaje</Link>
    </div>
  );
}

export default Viajes;
