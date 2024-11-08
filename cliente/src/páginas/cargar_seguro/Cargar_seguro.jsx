import { useNavigate } from "react-router-dom";
import { useContextoGlobal } from "../../Contexto";
import Seguro_1 from "./Seguro_1";
import Seguro_2 from "./Seguro_2";
import { useEffect, useState } from "react";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";

const Cargar_seguro = () => {
  const navegar = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const axiosPrivado = useAxiosPrivado();
  const {
    acciones_seguro: acciones,
    dispatch_seguro: dispatch,
    estado_seguro: estado,
  } = useContextoGlobal();
  const {
    PROXIMA_PAGINA_SEGURO,
    ANTERIOR_PAGINA_SEGURO,
    RESETEAR_ESTADO,
  } = acciones;
  const { pagina_seguro } = estado;


  const enviarFormulario = () => {
    setError("");
    setCargando(true);
    axiosPrivado
      .post("/seguro", estado)
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


  return (
    <>
      <div className="App formulario">
        {/* PÁGINAS */}
        {pagina_seguro == 0 && <Seguro_1 />}
        {pagina_seguro == 1 && <Seguro_2 />}

        {/* BOTONERA */}
        <div className="botonera_formulario">
          {pagina_seguro == 0 && (
            <button
              className="formulario__boton volver"
              onClick={() => {
                dispatch({ type: RESETEAR_ESTADO });
                navegar("../");
              }}
            >
              Cancelar
            </button>
          )}
          {pagina_seguro == 1 && (
            <button
              className="formulario__boton volver"
              onClick={() =>
                dispatch({
                  type: ANTERIOR_PAGINA_SEGURO,
                  payload: {
                    /* acá iría el arreglo de comprobación*/
                  },
                })
              }
            >
              Volver
            </button>
          )}
          {pagina_seguro == 0 && (
            <button
              className="formulario__boton siguiente"
              onClick={() => {
                dispatch({ type: PROXIMA_PAGINA_SEGURO });
              }}
            >
              Siguiente
            </button>
          )}
          {pagina_seguro == 1 && (
            <button
              className="formulario__boton siguiente"
              onClick={() => {
                console.log(estado);
                enviarFormulario();
                dispatch({ type: RESETEAR_ESTADO });
                navegar("../");
              }}
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Cargar_seguro;
