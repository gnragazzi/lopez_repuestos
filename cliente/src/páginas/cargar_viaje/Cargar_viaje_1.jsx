import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Cargar_viaje_1({ dispatch, acciones }) {
  const { PROXIMA_PANTALLA } = acciones;
  return (
    <div>
      <h2>Cargar_viaje_1</h2>
      <p>1. camion: </p>
      <p>2. destinos: </p>
      <p>3. kilometros_realizados: 0</p>
      <p>4. costos_combustibles: 0,</p>
      <Link to="/viajes">
        <button>Volver</button>
      </Link>
      <button onClick={() => dispatch({ type: PROXIMA_PANTALLA })}>
        siguiente
      </button>
    </div>
  );
}

export default Cargar_viaje_1;
