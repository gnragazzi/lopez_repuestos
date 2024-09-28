import { Outlet } from "react-router-dom";

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
      <h1 className="prueba">Mantenimiento</h1>
    </div>
  );
}

export default Mantenimiento;
