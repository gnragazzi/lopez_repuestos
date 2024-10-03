import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Mantenimiento() {
  return (
    <div>
      <Outlet></Outlet>
      <h2 className="title__Casos">Mantenimiento</h2>
      <button className="button__acceso-formulario">
        <Link to="cargar_mantenimiento">Nuevo Mantenimiento</Link>
      </button>
    </div>
  );
}

export default Mantenimiento;
