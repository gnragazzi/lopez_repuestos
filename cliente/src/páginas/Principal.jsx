import { useState } from "react";
import { useContextoGlobal } from "../Contexto";

function Principal() {
  const [lista, setLista] = useState([]);
  const {
    estado_vencimiento: estado,
    acciones_vencimientos: acciones,
    dispatch_vencimientos: dispatch,
  } = useContextoGlobal();

  const ordenarLista = () => {
    //debería ordenar cada notificación según la fecha más próxima
  };

  return (
    <div>
      {/* <h2 className="prueba">Principal</h2> */}
      <div className="container_notificaciones">
        <div className="notificacion">
          <h3 className="notificacion_titulo">Seguro Vencido</h3>
          <p className="notificacion_datos">Juan Carlos Perez</p>
          <p className="notificacion_datos">Fecha de Vencimiento: 11/11/2024</p>
          <div className="notificacion_container_boton">
            <button className="notificacion_boton notificacion_descartar">
              Descartar
            </button>
            <button className="notificacion_boton notificacion_ver">Ver</button>
          </div>
        </div>
        <div className="notificacion">
          <h3 className="notificacion_titulo">Seguro Vencido</h3>
          <p className="notificacion_datos">Juan Carlos Perez</p>
          <p className="notificacion_datos">Fecha de Vencimiento: 11/11/2024</p>
          <div className="notificacion_container_boton">
            <button className="notificacion_boton notificacion_descartar">
              Descartar
            </button>
            <button className="notificacion_boton notificacion_ver">Ver</button>
          </div>
        </div>
        <div className="notificacion">
          <h3 className="notificacion_titulo">Seguro Vencido</h3>
          <p className="notificacion_datos">Juan Carlos Perez</p>
          <p className="notificacion_datos">Fecha de Vencimiento: 11/11/2024</p>
          <div className="notificacion_container_boton">
            <button className="notificacion_boton notificacion_descartar">
              Descartar
            </button>
            <button className="notificacion_boton notificacion_ver">Ver</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Principal;
