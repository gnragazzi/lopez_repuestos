import { Link } from "react-router-dom";
import { useContextoGlobal } from "../../Contexto";
import Costos_1 from "./Costos_1";

const Costos_camión = () => {
  const {
    acciones_camiones: acciones,
    dispatch_camiones: dispatch,
    estado_camiones: estado,
  } = useContextoGlobal();
  const { PROXIMA_PAGINA_COSTOS } = acciones;
  return (
    <>
      estado.pagina_costos == 0 && <Costos_1 />
    </>
  );
};

export default Costos_camión;
