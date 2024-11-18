/* eslint-disable react/prop-types */

const Notificación = ({
  titulo,
  datos,
  fecha,
  funcionDescartar,
  funcionVer,
}) => {
  return (
    <div className="notificacion">
      <h3 className="notificacion_titulo">{titulo}</h3>
      <p className="notificacion_datos">Datos: {datos}</p>
      {fecha && (
        <p className="notificacion_datos">
          Fecha de Vencimiento: {`${fecha.dia}/${fecha.mes}/${fecha.año}`}
        </p>
      )}
      <div className="notificacion_container_boton">
        <button
          className="notificacion_boton notificacion_descartar"
          onClick={funcionDescartar}
        >
          Descartar
        </button>
        <button
          className="notificacion_boton notificacion_ver"
          onClick={funcionVer}
        >
          Ver
        </button>
      </div>
    </div>
  );
};

export default Notificación;
