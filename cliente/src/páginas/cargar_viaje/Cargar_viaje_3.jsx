/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";
import { notificacion_error } from "../../utilidades/toast_modificados";

const Cargar_viaje_3 = ({ dispatch, acciones, estado }) => {
  const axiosPrivado = useAxiosPrivado();
  const [cargando, setCargando] = useState(false);
  const [errorFetch, setErrorFetch] = useState("");
  const [error, setError] = useState("");
  const [icono_error, setIcono_Error] = useState("");
  const seleccion = () => {
    if (semirremolque_seleccionado) {
      setError("");
      setIcono_Error("");
      return true;
    }
    setError("Debe elegir un semirremolque para poder avanzar");
    setIcono_Error(MdErrorOutline);
    return false;
  };

  const {
    PROXIMA_PANTALLA,
    PANTALLA_ANTERIOR,
    CARGAR_LISTA_SEMIRREMOLQUE,
    SELECCIONAR_SEMIRREMOLQUE,
  } = acciones;
  const {
    cuerpo_cargar_viaje: { semirremolque: semirremolque_seleccionado },
    filtros: { semirremolques: filtro_semirremolque },
    lista_semirremolques,
  } = estado;
  useEffect(() => {
    setErrorFetch("");
    setCargando(true);
    axiosPrivado
      .get("/vehiculos?tipo=semirremolque")
      .then((res) => {
        dispatch({
          type: CARGAR_LISTA_SEMIRREMOLQUE,
          payload: res.data,
        });
        setCargando(false);
      })
      .catch((error) => {
        setCargando(false);
        setErrorFetch(error?.message);
      });
  }, [CARGAR_LISTA_SEMIRREMOLQUE, axiosPrivado, dispatch]);
  if (cargando) {
    return <h1>Cargando...</h1>;
  } else if (errorFetch) {
    return (
      <>
        <h1>{errorFetch}</h1>
      </>
    );
  } else
    return (
      <div className="App formulario">
        <h2>Selección de Semirremolque</h2>
        <br />
        <div className="container__table form-table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Marca</th>
                <th>Patente</th>
              </tr>
            </thead>
            <tbody>
              {lista_semirremolques.map((semirremolque) => {
                const { patente, marca } = semirremolque;
                return (
                  <tr
                    className={
                      filtro_semirremolque.includes(patente)
                        ? "vehiculos_lista no_disponible"
                        : semirremolque_seleccionado == patente
                        ? "vehiculos_lista vehiculos_lista vehiculos_lista_seleccionado_viaje"
                        : "vehiculos_lista disponible"
                    }
                    key={patente}
                    onClick={
                      filtro_semirremolque.includes(patente)
                        ? () => {
                            console.log("No se puede seleccionar");
                          }
                        : () => {
                            dispatch({
                              type: SELECCIONAR_SEMIRREMOLQUE,
                              payload: patente,
                            });
                          }
                    }
                  >
                    <td>
                      <p>{marca}</p>
                    </td>
                    <td>
                      <p>{patente}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="botonera_formulario">
          <button
            className="formulario__boton volver"
            onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}
          >
            Volver
          </button>
          {/* <div className="no_seleccionado">
            {icono_error} {error}
          </div> */}
          <button
            className="formulario__boton siguiente"
            onClick={() => {
              if (seleccion()) {
                dispatch({
                  type: PROXIMA_PANTALLA,
                  payload: [Boolean(semirremolque_seleccionado)],
                });
              } else {
                notificacion_error(
                  "Debe seleccionar un semirremolque para poder avanzar"
                );
              }
            }}
          >
            Siguiente
          </button>
        </div>
      </div>
    );
};

export default Cargar_viaje_3;
