import { useContextoGlobal } from "../../Contexto";
import { notificacion_exito } from "../../utilidades/toast_modificados";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";
import Confirmar_chofer from "./Confirmar_chofer";
import Formulario_chofer from "./Formulario_chofer";
import { useNavigate } from "react-router-dom";

const Chofer_manejador = () => {
  const navegar = useNavigate();
  const {
    estado_choferes: {
      pantalla,
      datos_chofer,
      esModificacion,
      datos_anteriores: { dni },
    },
    dispatch_choferes: dispatch,
    acciones_choferes: { RESETEAR_CHOFER, ERROR_SERVIDOR },
  } = useContextoGlobal();

  const axiosPrivado = useAxiosPrivado();

  const enviarFormulario = () => {
    if (!esModificacion) {
      axiosPrivado
        .post("/empleados?tipo=chofer", { ...datos_chofer, esActivo: true })
        .then(() => {
          notificacion_exito("🛠 Cargado Correctamente 🛠");
          dispatch({ tipo: RESETEAR_CHOFER });
          navegar("/empleados/choferes");
        })
        .catch((error) => {
          dispatch({ tipo: ERROR_SERVIDOR, payload: error.message });
        });
    } else {
      axiosPrivado
        .patch(`/empleados?id=${dni}`, {
          ...datos_chofer,
          esActivo: datos_chofer.activo,
        })
        .then(() => {
          notificacion_exito("🛠 Actualizado Correctamente 🛠");
          dispatch({ tipo: RESETEAR_CHOFER });
          navegar("/empleados/choferes");
        })
        .catch((error) => {
          dispatch({ tipo: ERROR_SERVIDOR, payload: error.message });
        });
    }
  };

  return (
    <>
      {pantalla == 0 && <Formulario_chofer enviar={enviarFormulario} />}
      {pantalla > 0 && <Confirmar_chofer enviar={enviarFormulario} />}
    </>
  );
};

export default Chofer_manejador;
