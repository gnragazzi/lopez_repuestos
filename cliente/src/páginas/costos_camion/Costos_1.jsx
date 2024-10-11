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
      <div>
        <form>
          <label htmlFor="nes">Mes:</label>
          <select
            id="mes"
            name="mes"
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
          <label htmlFor="año">Año: </label>
          <select
            id="año"
            name="año"
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
        </form>
      </div>
    </>
  );
};

export default Costos_1;
