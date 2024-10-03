import { Link } from "react-router-dom";

Link;
function Cargar_viaje_3({ dispatch, acciones }) {
  const { PANTALLA_ANTERIOR } = acciones;
  return (
    <>
      <div>Confirmar Datos</div>
      <button onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}>
        Previo
      </button>
      <Link to="/viajes">
        <button>Enviar Formulario</button>
      </Link>
    </>
  );
}

export default Cargar_viaje_3;
