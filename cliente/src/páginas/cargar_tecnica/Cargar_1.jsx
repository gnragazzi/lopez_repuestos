import { useContextoGlobal } from "../../Contexto";

const Cargar_1 = () => {
  const {
    acciones_tecnica: {
      SELECCIONAR_FECHA_EMISION,
      SELECCIONAR_FECHA_VENCIMIENTO,
      SELECCIONAR_UBICACION,
    },
    dispatch_tecnica: dispatch,
    estado_tecnica: estado,
  } = useContextoGlobal();

  return (
    <>
      <h2>Cargar Técnica</h2>
      <form className="form-table form__mantenimiento">
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Fecha emisión</legend>
          <input
            type="date"
            name="fecha_emision"
            id="fecha_emision"
            className="items__input"
            value={estado.fecha_emision}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_FECHA_EMISION,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Fecha vencimiento</legend>
          <input
            type="date"
            name="fecha_vencimiento"
            id="fecha_vencimiento"
            className="items__input"
            value={estado.fecha_vencimiento}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_FECHA_VENCIMIENTO,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Ubicación</legend>
          <input
            type="text"
            name="ubicacion"
            id="ubicacion"
            className="items__input"
            value={estado.ubicacion}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_UBICACION,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>

      </form>
    </>
  );
};

export default Cargar_1;
