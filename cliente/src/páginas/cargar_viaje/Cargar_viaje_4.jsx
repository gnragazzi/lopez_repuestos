/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";

const Cargar_viaje_3 = ({ dispatch, acciones, estado }) => {
  const [error, setError] = useState("");
  const [icono_error, setIcono_Error] = useState("");
  const [cargando, setCargando] = useState(false);
  const [errorFetch, setErrorFetch] = useState("");
  const axiosPrivado = useAxiosPrivado();

  const seleccion = () => {
    if (chofer_seleccionado) {
      setError("");
      setIcono_Error("");
      return true;
    }
    setError("Debe elegir un chofer para poder avanzar");
    setIcono_Error(MdErrorOutline);
    return false;
  };

  const {
    PROXIMA_PANTALLA,
    PANTALLA_ANTERIOR,
    CARGAR_LISTA_CHOFER,
    SELECCIONAR_CHOFER,
  } = acciones;
  const {
    cuerpo_cargar_viaje: { chofer: chofer_seleccionado },
    filtros: { choferes: filtro_chofer },
    lista_choferes,
  } = estado;
  useEffect(() => {
    setErrorFetch("");
    setCargando(true);
    axiosPrivado
      .get("/empleados?tipo=chofer&activo=true")
      .then((res) => {
        setCargando(false);
        dispatch({
          type: CARGAR_LISTA_CHOFER,
          payload: res.data,
        });
      })
      .catch((error) => {
        setCargando(false);

        setErrorFetch(error.message);
      });
  }, [CARGAR_LISTA_CHOFER, axiosPrivado, dispatch]);
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
        <h2>Selección de Chofer</h2>
        <br />
        <div className="container__table form-table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellido</th>
              </tr>
            </thead>
            <tbody>
              {lista_choferes.map((chofer) => {
                const { dni, nombre, apellido } = chofer;
                return (
                  <tr
                    className={
                      filtro_chofer.includes(dni)
                        ? "vehiculos_lista no_disponible"
                        : chofer_seleccionado == dni
                        ? "vehiculos_lista vehiculos_lista_seleccionado_viaje"
                        : "vehiculos_lista disponible"
                    }
                    key={dni}
                    onClick={
                      filtro_chofer.includes(dni)
                        ? () => {
                            console.log("No se puede seleccionar");
                          }
                        : () => {
                            dispatch({
                              type: SELECCIONAR_CHOFER,
                              payload: dni,
                            });
                          }
                    }
                  >
                    <td>
                      <p>{dni}</p>
                    </td>
                    <td>
                      <p>{nombre}</p>
                    </td>
                    <td>
                      <p>{apellido}</p>
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
          <div className="no_seleccionado">
            {icono_error} {error}
          </div>
          <button
            className="formulario__boton siguiente"
            onClick={() => {
              if (seleccion()) {
                dispatch({
                  type: PROXIMA_PANTALLA,
                  payload: [Boolean(chofer_seleccionado)],
                });
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
