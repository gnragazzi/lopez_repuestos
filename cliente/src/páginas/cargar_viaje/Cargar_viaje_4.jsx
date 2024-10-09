/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";

const Cargar_viaje_3 = ({ dispatch, acciones, estado }) => {
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
    axios
      .get("http://localhost:8080/empleados?tipo=chofer", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({
          type: CARGAR_LISTA_CHOFER,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="App formulario">
      <h2>Selección de Chofer</h2>
      <br />
      <div className="container__table form-table">
        <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>DNI</th>
                    <th>Apellido</th>
                  </tr>
                </thead>
                <tbody>
                  {lista_choferes.map((chofer) => {
                    const { dni, marca } = chofer;
                    return (
                      <tr
                        className={
                          filtro_chofer.includes(dni)
                            ? "vehiculos_lista no_disponible"
                            : chofer_seleccionado == dni
                            ? "vehiculos_lista vehiculos_lista_seleccionado"
                            : "vehiculos_lista"
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
                        <td><p>{marca}</p></td>
                        <td><p>{dni}</p></td>

                      </tr>
                    );
                  })}
                </tbody>
        </table>
      </div>

      <div className="botonera_formulario">
        <button className="formulario__boton volver" onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}>
          Volver
        </button>
        <button className="formulario__boton siguiente"
          onClick={() =>
            dispatch({
              type: PROXIMA_PANTALLA,
              payload: [Boolean(chofer_seleccionado)],
            })
          }
        >
          Siguiente
        </button>
      </div>

    </div>
  );
};

export default Cargar_viaje_3;
