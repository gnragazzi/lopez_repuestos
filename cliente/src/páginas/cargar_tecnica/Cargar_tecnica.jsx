import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextoGlobal } from "../../Contexto";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";
import Cargar_1 from "./Cargar_1";
import Cargar_2 from "./Cargar_2";

const Cargar_tecnica = () => {
  const navegar = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const axiosPrivado = useAxiosPrivado();
  const {
    acciones_camiones: acciones,
    dispatch_camiones: dispatch,
    estado_camiones: estado,
  } = useContextoGlobal();
  const { PROXIMA_PAGINA_TECNICA, ANTERIOR_PAGINA_TECNICA } = acciones;
  const { pagina_tecnica } = estado;

  const enviar_formulario = () => {
    setError("");
    setCargando(true);
    axiosPrivado
      .post("/tecnica?tipo=camion", estado)
      .then(() => {
        setCargando(false);
      })
      .catch((error) => {
        setCargando(false);
        setError(error.message);
      });
    if (cargando) {
      return <h1>Cargando...</h1>;
    } else if (error) {
      return (
        <>
          <h1>{error}</h1>
        </>
      );
    }
  };

  console.log(estado);
  return (
    <>
      <div className="App formulario">
        {/* PÁGINAS */}
        {pagina_tecnica == 0 && <Cargar_1 />}
        {pagina_tecnica == 1 && <Cargar_2 />}

        {/* BOTONERA */}
        <div className="botonera_formulario">
          {pagina_tecnica == 0 && (
            <button
              className={"formulario__boton volver"}
              onClick={() => navegar("/vehículos/camiones")}
            >
              Volver
            </button>
          )}
          {pagina_tecnica == 1 && (
            <button
              className="formulario__boton volver"
              onClick={() =>
                dispatch({
                  type: ANTERIOR_PAGINA_TECNICA,
                  payload: {
                    /* acá iría el arreglo de comprobación*/
                  },
                })
              }
            >
              Volver
            </button>
          )}
          {pagina_tecnica == 0 && (
            <button
              className="formulario__boton siguiente"
              onClick={() => {
                dispatch({ type: PROXIMA_PAGINA_TECNICA });
              }}
            >
              Siguiente
            </button>
          )}
          {
            pagina_tecnica == 1 && (
              <button
              className="formulario__boton siguiente"
              onClick={() => {
                enviar_formulario();
                navegar("/vehículos/camiones");
              }}
            >
              Confirmar
            </button>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Cargar_tecnica;
