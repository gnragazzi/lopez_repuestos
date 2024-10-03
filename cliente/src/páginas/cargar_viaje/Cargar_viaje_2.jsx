/* eslint-disable react/prop-types */
function Cargar_viaje_2({ dispatch, acciones, estado }) {
  const {
    PROXIMA_PANTALLA,
    PANTALLA_ANTERIOR,
    SELECCIONAR_FECHA_PARTIDA,
    SELECCIONAR_FECHA_LLEGADA,
    SELECCIONAR_FECHA_ESPERADA,
  } = acciones;
  const {
    cuerpo_cargar_viaje: { fecha_llegada, fecha_partida, fecha_esperada },
  } = estado;
  return (
    <div>
      <h2>Cargar_viaje_2</h2>
      <form action="">
        <fieldset>
          <legend>Fecha de Partida</legend>
          <input
            type="date"
            value={fecha_partida}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_FECHA_PARTIDA,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>
        <fieldset>
          <legend>Fecha de Llegada</legend>
          <input
            type="date"
            value={fecha_llegada}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_FECHA_LLEGADA,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>
        <fieldset>
          <legend>Fecha Esperada</legend>
          <input
            type="date"
            value={fecha_esperada}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_FECHA_ESPERADA,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>
      </form>
      <button onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}>
        Previo
      </button>
      <button
        onClick={() =>
          dispatch({
            type: PROXIMA_PANTALLA,
            //hay que validar las fechas unas contra otras (por ejemplo, fecha de partida no puede ser posterior a fecha de llegada)
            payload: [
              Boolean(fecha_partida),
              Boolean(fecha_llegada),
              Boolean(fecha_esperada),
            ],
          })
        }
      >
        siguiente
      </button>
    </div>
  );
}

Cargar_viaje_2.proptyp;

export default Cargar_viaje_2;
