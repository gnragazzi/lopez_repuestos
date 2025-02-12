/* eslint-disable react/prop-types */
const Cargar_M4 = ({ estado }) => {
  const {
    cuerpo_cargar_mantenimiento,
    cuerpo_cargar_mantenimiento: {
      vehiculo: { vehiculoSeleccionado, esCamion },
      mecanicosSeleccionados,
    },
    lista_vehículos,
    lista_mecánicos,
  } = estado;
  return (
    <>
      <h2>Confirme Selección</h2>
      <div className="confirmar__seleccion">
        <h4>Vehículo: </h4>
        {lista_vehículos.map((v) => {
          return (
            v.patente == vehiculoSeleccionado && (
              <p key={v.patente}>
                Marca: {v.marca} | Patente {v.patente}
              </p>
            )
          );
        })}
        <h4>Mecánicos: </h4>
        {lista_mecánicos.map((m) => {
          return (
            mecanicosSeleccionados.includes(m.dni) && (
              <p key={m.dni}>
                Nombre: {m.nombre} {m.apellido} | DNI: {m.dni}
              </p>
            )
          );
        })}
        <h4>Datos del Mantenimiento: </h4>
        <p>
          Trabajo Realizado: {cuerpo_cargar_mantenimiento.trabajos_realizados}
        </p>
        <p>Costo Repuesto: ${cuerpo_cargar_mantenimiento.costo_repuestos}</p>
        <p>
          Costo Mano de Obra: ${cuerpo_cargar_mantenimiento.costo_manodeobra}
        </p>
        {esCamion && (
          <p>
            Kilómetros del camión en que se realizó el mantenimiento:{" "}
            {cuerpo_cargar_mantenimiento.kilometros_en_que_se_realizo}Km
          </p>
        )}
        <p>Fecha: {cuerpo_cargar_mantenimiento.fecha}</p>
      </div>
    </>
  );
};

export default Cargar_M4;
