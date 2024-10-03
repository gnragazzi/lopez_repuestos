/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

Link;
function Cargar_viaje_3({
  dispatch,
  acciones,
  cuerpo,
  lista_vehiculos,
  enviarFormulario,
}) {
  const { PANTALLA_ANTERIOR } = acciones;
  const {
    camion,
    kilometros_realizados,
    costos_combustibles,
    destinos,
    fecha_partida,
    fecha_llegada,
    fecha_esperada,
  } = cuerpo;
  return (
    <>
      <>
        <h2>Confirme Selección</h2>
        {lista_vehiculos.map((v) => {
          return (
            camion == v.patente && (
              <p key={v.patente}>
                Marca: {v.marca} | Patente {v.patente}
              </p>
            )
          );
        })}
        <p>Destino: {destinos}</p>
        <p>Kilometros Realizados: {kilometros_realizados}</p>
        <p>Costo de Combustible: {costos_combustibles}</p>
        <p>Fecha de partida: {fecha_partida}</p>
        <p>Fecha de llegada: {fecha_llegada}</p>
        <p>Fecha de esperada: {fecha_esperada}</p>
      </>
      <button onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}>
        Previo
      </button>
      <button onClick={enviarFormulario}>Enviar Formulario</button>
    </>
  );
}

export default Cargar_viaje_3;
