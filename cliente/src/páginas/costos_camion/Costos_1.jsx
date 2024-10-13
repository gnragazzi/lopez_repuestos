import { useContextoGlobal } from "../../Contexto";

const Costos_1 = () => {
  const {
    acciones_camiones: { SELECCIONAR_MES, SELECCIONAR_AÑO },
    dispatch_camiones: dispatch,
    estado_camiones: estado,
  } = useContextoGlobal();
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const años = Array.from({ length: 20 }, (_, i) => 2024 - i);
  return (
    <>
      <h2>Seleccione la Fecha:</h2>
      <form form className="form-table form__mantenimiento">
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Mes</legend>
          <select
            className="items__input"
            id="mes"
            name="mes"
            value={meses[estado.mes_costo]}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_MES,
                payload: meses.indexOf(e.target.value),
              });
            }}
          >
            {meses.map((mes, i) => {
              return (
                <option key={i} value={mes}>
                  {mes}
                </option>
              );
            })}
          </select>
        </fieldset>

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Año</legend>
          <select
            className="items__input"
            id="año"
            name="año"
            value={estado.año_costo}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_AÑO,
                payload: e.target.value,
              });
            }}
          >
            {años.map((año) => {
              return (
                <option key={año} value={año}>
                  {año}
                </option>
              );
            })}
          </select>
        </fieldset>
      </form>
    </>
  );
};

export default Costos_1;
