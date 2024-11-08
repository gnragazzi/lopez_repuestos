import { useContextoGlobal } from "../Contexto";
import { FaTimes } from "react-icons/fa";
const Modal = () => {
  const {
    estadoModal: { activo, mensaje, accion },
    setEstadoModal,
  } = useContextoGlobal();
  const cerrarModal = () => {
    setEstadoModal({ activo: false, mensaje: "", accion: () => {} });
  };

  return (
    <div className={activo ? "modal_container activo" : "modal_container"}>
      <div className="modal_pantalla"></div>
      <div className="modal_caja">
        <FaTimes className="modal_boton_cerrar" onClick={cerrarModal} />
        <h3 className="modal_mensaje">{mensaje}</h3>
        <div className="modal_botonera">
          <button id="confirmar" className="modal_boton " onClick={accion}>
            Confirmar
          </button>
          <button id="cancelar" className="modal_boton " onClick={cerrarModal}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
