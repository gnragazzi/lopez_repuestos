/* eslint-disable react/prop-types */

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
      <div className="App formulario">
        <h2>Confirme Selección</h2>
        <div className="confirmar__seleccion">
          {lista_camiones.map((v) => {
            return (
              camion == v.patente && (
                <div key={v.patente}>
                  <h4>Camión:</h4>
                  <p>
                    Marca: {v.marca} | Patente {v.patente}
                  </p>
                </div>
              )
            );
          })}
          {lista_semirremolques.map((v) => {
            return (
              semirremolque == v.patente && (
                <div key={v.patente}>
                  <h4>Semirremolque: </h4>
                  <p>
                    Marca: {v.marca} | Patente {v.patente}
                  </p>
                </div>
              )
            );
          })}
          {lista_choferes.map((c) => {
            return (
              chofer == c.dni && (
                <div key={c.dni}>
                  <h4>Chofer: </h4>
                  <p>
                    DNI: {c.dni} | Nombre: {c.nombre} | Apellido: {c.apellido}
                  </p>
                </div>
              )
            );
          })}
          <h4>Datos de Viaje: </h4>
          <p>Destino: {destino}</p>
          <p>Kilometros Realizados: {kilometros_realizados}</p>
          <p>Costo de Combustible: {costos_combustibles}</p>
          <p>Peso de la carga: {peso}Kg</p>
          <p>Fecha de partida: {fecha_partida}</p>
          <p>Fecha de llegada: {fecha_llegada}</p>
          <p>Fecha de esperada: {fecha_esperada}</p>
        </div>

        <div className="botonera_formulario">
          <button
            className="formulario__boton volver"
            onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}
          >
            Volver
          </button>
          <button
            className="formulario__boton siguiente"
            onClick={enviarFormulario}
          >
            Confirmar
          </button>
        </div>
      </div>
    </>
  );
}

export default Cargar_viaje_6;
