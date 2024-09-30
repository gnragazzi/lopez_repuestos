import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Mantenimiento() {
  /*
  Vehículo
  Mecánicos
  Trabajos realizados
  Fecha
  Costos_Repuesto
  Costo_mano de obra
  */
  /*
  0. Ir a nuevo mantenimiento
  1. Elegir un vehículo de la lista
  2. Elegir uno o más mecánicos de los disponibles
  ///////////////////////////////////////////////
  3. Describir trabajo,
  4. Seleccionar Fecha
  5. Ingresar costos 
  ///////////////////////////////////////////////
  6. Pantalla de confirmación (debería mostrar toda la info)
  ///////////////////////////////////////////////
  7. Volver a pantalla de
  */
  return (
    <div>
      <Outlet></Outlet>
      <h2 className="title__Casos">Mantenimiento</h2>
      <button className="button__acceso-formulario"><Link to="nuevo">Nuevo Mantenimiento</Link></button>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laboriosam eveniet esse facere saepe voluptate explicabo eos soluta architecto, suscipit, optio aliquam corrupti unde perferendis provident ut, nihil sunt accusantium?
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus dolorum accusamus excepturi laudantium ex modi distinctio perspiciatis et natus eligendi, in suscipit asperiores, numquam velit! Obcaecati voluptate pariatur corporis praesentium.
      
    </div>
  );
}

export default Mantenimiento;
