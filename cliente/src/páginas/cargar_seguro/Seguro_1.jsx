import { useContextoGlobal } from "../../Contexto";

const Seguro_1 = () => {
  const {
    acciones_seguro: acciones,
    dispatch_seguro: dispatch,
    estado_seguro: estado,
  } = useContextoGlobal();

  const {
    SELECCIONAR_FECHA_EMISION,
    SELECCIONAR_FECHA_VENCIMIENTO,
    SELECCIONAR_NOMBRE_ASEGURADORA,
    SELECCIONAR_PAGO,
    SELECCIONAR_TIPO,
  } = acciones;

  return (
    <>
      <h2>Seleccione la Fecha:</h2>
      <form className="form-table form__mantenimiento">
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Aseguradora</legend>
          <input
            type="text"
            name="nombre_aseguradora"
            id="nombre_aseguradora"
            className="items__input"
            value={estado.nombre_aseguradora}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_NOMBRE_ASEGURADORA,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Tipo</legend>
          <input
            type="text"
            name="tipo"
            id="tipo"
            className="items__input"
            value={estado.tipo}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_TIPO,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Pago</legend>
          <input
            type="number"
            name="pago"
            id="pago"
            className="items__input"
            value={estado.pago}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_PAGO,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Emisión</legend>
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
          <legend className="form__legend">Vencimiento</legend>
          <input
            type="date"
            name="fecha_emision"
            id="fecha_emision"
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
      </form>
    </>
  );
};

export default Seguro_1;
