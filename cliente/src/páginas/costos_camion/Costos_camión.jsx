import { useNavigate } from "react-router-dom";
import { useContextoGlobal } from "../../Contexto";
import Costos_1 from "./Costos_1";
import Costos_2 from "./Costos_2";

const Costos_camión = () => {
  const navegar = useNavigate();
  const {
    acciones_camiones: acciones,
    dispatch_camiones: dispatch,
    estado_camiones: estado,
  } = useContextoGlobal();
  const { PROXIMA_PAGINA_COSTOS, ANTERIOR_PAGINA_COSTOS } = acciones;
  const { pagina_costos } = estado;
  return (
    <>
      <div className="App formulario">
        {/* PÁGINAS */}
        {pagina_costos == 0 && <Costos_1 />}
        {pagina_costos == 1 && <Costos_2 />}

        {/* BOTONERA */}
        <div className="botonera_formulario">
          {
            <button
              className={`formulario__boton ${
                pagina_costos == 0 ? "volver" : "siguiente"
              }`}
              onClick={() => navegar("/vehículos/camiones")}
            >
              Volver a Lista de Camiones
            </button>
          }
          {pagina_costos == 1 && (
            <button
              className="formulario__boton volver"
              onClick={() =>
                dispatch({
                  type: ANTERIOR_PAGINA_COSTOS,
                  payload: {
                    /* acá iría el arreglo de comprobación*/
                  },
                })
              }
            >
              Volver a Seleccionar Período
            </button>
          )}
          {pagina_costos == 0 && (
            <button
              className="formulario__boton siguiente"
              onClick={() => {
                dispatch({ type: PROXIMA_PAGINA_COSTOS });
              }}
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Costos_camión;
