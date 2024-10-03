import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Cargar_viaje_1({ dispatch, acciones, estado }) {
  const {
    PROXIMA_PANTALLA,
    SELECCIONAR_VEHICULO,
    SELECCIONAR_DESTINO,
    SELECCIONAR_KILOMETROS_REALIZADOS,
    SELECCIONAR_COSTO_COMBUSTIBLE,
  } = acciones;
  const {
    lista_vehiculos: lista_camiones,
    cuerpo_cargar_viaje: {
      camion: camion_seleccionado,
      destinos,
      kilometros_realizados,
      costos_combustibles,
    },
  } = estado;
  return (
    <div>
      <h2>Cargar_viaje_1</h2>
      <h4>Seleccione el vehículo para el viaje</h4>
      <ul>
        <li className="vehiculos_lista header_lista">
          <p>Marca</p>
          <p>Patente</p>
        </li>
        {lista_camiones.map((camion) => {
          const { patente, marca } = camion;
          return (
            <li
              className={
                camion_seleccionado == patente
                  ? "vehiculos_lista vehiculos_lista_seleccionado"
                  : "vehiculos_lista"
              }
              key={patente}
              onClick={() => {
                dispatch({ type: SELECCIONAR_VEHICULO, payload: patente });
              }}
            >
              <p>{marca}</p>
              <p>{patente}</p>
            </li>
          );
        })}
      </ul>
      <form>
        <fieldset>
          <legend>Ingrese el destino del viaje</legend>
          <textarea
            placeholder="destino"
            value={destinos}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_DESTINO,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>
        <fieldset>
          <legend>3. kilometros_realizados: </legend>

          <input
            placeholder="3. kilometros_realizados: "
            type="number"
            value={kilometros_realizados}
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_KILOMETROS_REALIZADOS,
                payload: e.target.value,
              })
            }
          />
        </fieldset>
        <fieldset>
          <legend>4. costos_combustibles: </legend>

          <input
            placeholder="3. kilometros_realizados: 0"
            type="number"
            value={costos_combustibles}
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_COSTO_COMBUSTIBLE,
                payload: e.target.value,
              })
            }
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
            payload: [
              Boolean(camion_seleccionado),
              Boolean(destinos),
              Boolean(kilometros_realizados),
              Boolean(costos_combustibles),
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
