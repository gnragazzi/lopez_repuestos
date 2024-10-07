import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Cargar_viaje_1({ dispatch, acciones, estado }) {
  const {
    PROXIMA_PANTALLA,
    SELECCIONAR_FECHA_PARTIDA,
    SELECCIONAR_FECHA_LLEGADA,
    SELECCIONAR_FECHA_ESPERADA,
  } = acciones;
  const {
    cuerpo_cargar_viaje: { fecha_llegada, fecha_partida, fecha_esperada },
  } = estado;
  return (
    <div>
      <h2>Por Favor, seleccione las fechas en las que se realizo el viaje</h2>
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
      <Link to="/viajes">
        <button>Volver</button>
      </Link>
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

export default Cargar_viaje_1;
