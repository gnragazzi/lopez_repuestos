// eslint-disable-next-line react/prop-types
function Cargar_viaje_2({ dispatch, acciones }) {
  const { PROXIMA_PANTALLA, PANTALLA_ANTERIOR } = acciones;
  return (
    <div>
      <h2>Cargar_viaje_2</h2>
      <p>1. Fecha de partida</p>
      <p>2. Fecha de llegada</p>
      <p>3. Fecha Esperada</p>
      <button onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}>
        Previo
      </button>
      <button onClick={() => dispatch({ type: PROXIMA_PANTALLA })}>
        siguiente
      </button>
    </div>
  );
}

export default Cargar_viaje_2;
