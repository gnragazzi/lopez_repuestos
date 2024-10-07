/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

Link;
function Cargar_viaje_6({ dispatch, acciones, estado, enviarFormulario }) {
  const { PANTALLA_ANTERIOR } = acciones;
  const {
    camion,
    chofer,
    semirremolque,
    kilometros_realizados,
    costos_combustibles,
    destino,
    fecha_partida,
    fecha_llegada,
    fecha_esperada,
    peso,
  } = estado.cuerpo_cargar_viaje;
  const { lista_camiones, lista_semirremolques, lista_choferes } = estado;
  return (
    <>
      <>
        <h2>Confirme Selección</h2>
        {lista_camiones.map((v) => {
          return (
            camion == v.patente && (
              <div>
                <h4>Camión:</h4>
                <p key={v.patente}>
                  Marca: {v.marca} | Patente {v.patente}
                </p>
              </div>
            )
          );
        })}
        {lista_semirremolques.map((v) => {
          return (
            semirremolque == v.patente && (
              <div>
                <h4>Semirremolque: </h4>
                <p key={v.patente}>
                  Marca: {v.marca} | Patente {v.patente}
                </p>
              </div>
            )
          );
        })}
        {lista_choferes.map((c) => {
          return (
            chofer == c.dni && (
              <div>
                <h4>Chofer: </h4>
                <p key={c.dni}>DNI: {c.dni}</p>
              </div>
            )
          );
        })}
        <p>Destino: {destino}</p>
        <p>Kilometros Realizados: {kilometros_realizados}</p>
        <p>Costo de Combustible: {costos_combustibles}</p>
        <p>Peso de la carga: {peso}</p>
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

export default Cargar_viaje_6;
