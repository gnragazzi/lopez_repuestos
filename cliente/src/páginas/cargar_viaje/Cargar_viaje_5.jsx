/* eslint-disable react/prop-types */
function Cargar_viaje_5({ dispatch, acciones, estado }) {
  const {
    PROXIMA_PANTALLA,
    PANTALLA_ANTERIOR,
    SELECCIONAR_DESTINO,
    SELECCIONAR_KILOMETROS_REALIZADOS,
    SELECCIONAR_COSTO_COMBUSTIBLE,
    SELECCIONAR_PESO,
  } = acciones;
  const {
    cuerpo_cargar_viaje: {
      destino,
      kilometros_realizados,
      costos_combustibles,
      peso,
    },
  } = estado;

  return (
    <div>
      <h2>Por Favor, complete los siguientes campos</h2>
      <form>
        <fieldset>
          <legend>Ingrese el destino del viaje</legend>
          <textarea
            placeholder="destino"
            value={destino}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_DESTINO,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>
        <fieldset>
          <legend>kilometros_realizados: </legend>

          <input
            placeholder="Ingrese los kilometros realizados en el viaje: "
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
          <legend>Costos Combustibles: </legend>

          <input
            placeholder="Ingrese el costo del combustible: "
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
        <fieldset>
          <legend>Peso: </legend>

          <input
            placeholder="Ingrese el peso de la carga: "
            type="number"
            value={peso}
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_PESO,
                payload: e.target.value,
              })
            }
          />
        </fieldset>
      </form>
      <button onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}>
        Pantalla anterior
      </button>
      <button
        onClick={() =>
          dispatch({
            type: PROXIMA_PANTALLA,
            payload: [
              Boolean(destino),
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

export default Cargar_viaje_5;
