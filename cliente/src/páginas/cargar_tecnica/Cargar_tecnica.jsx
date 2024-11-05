import { useNavigate } from "react-router-dom";
import { useContextoGlobal } from "../../Contexto";
import Cargar_1 from "./Cargar_1";
import Cargar_2 from "./Cargar_2";

const Cargar_tecnica = () => {
  const navegar = useNavigate();
  const {
    acciones_camiones: acciones,
    dispatch_camiones: dispatch,
    estado_camiones: estado,
  } = useContextoGlobal();
  const { PROXIMA_PAGINA_CARGAR, ANTERIOR_PAGINA_CARGAR } = acciones;
  const { pagina_cargar } = estado;
  return (
    <>
      <div className="App formulario">
        {/* PÁGINAS */}
        {pagina_cargar == 0 && <Cargar_1 />}
        {pagina_cargar == 1 && <Cargar_2 />}

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
                  type: ANTERIOR_PAGINA_CARGAR,
                  payload: {
                    /* acá iría el arreglo de comprobación*/
                  },
                })
              }
            >
              Volver
            </button>
          )}
          {pagina_costos == 0 && (
            <button
              className="formulario__boton siguiente"
              onClick={() => {
                dispatch({ type: PROXIMA_PAGINA_CARGAR });
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

export default Cargar_tecnica;

