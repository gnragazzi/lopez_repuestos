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
    <div className="App formulario">
      <h2>Detalles</h2>
      <form className="form-table form__mantenimiento">
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Destino del viaje</legend>
          <textarea
            className="items__input input__textarea"
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
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Kilometros realizados</legend>

          <input
            className="items__input"
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
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Costos Combustibles</legend>

          <input
            className="items__input"
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
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Peso</legend>

          <input
            className="items__input"
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


    <div className="botonera_formulario">
      <button className="formulario__boton volver" onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}>
          Volver
        </button>
        <button className="formulario__boton siguiente" 
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
          Siguiente
        </button>
    </div>

    </div>
  );
}

export default Cargar_viaje_5;
