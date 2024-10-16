/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";

const Cargar_viaje_3 = ({ dispatch, acciones, estado }) => {
  
  const [error,setError]=useState("");
  const [icono_error,setIcono_Error]=useState("");
 
  const seleccion = () => {
    if(semirremolque_seleccionado){
      setError("");
      setIcono_Error("");
      return true;
    }
    setError("Debe elegir un semirremolque para poder avanzar")
    setIcono_Error(MdErrorOutline);
    return false;

  }

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
    axios
      .get("http://localhost:8080/vehiculos?tipo=semirremolque", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({
          type: CARGAR_LISTA_SEMIRREMOLQUE,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  }, []);
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
                    <td><p>{marca}</p></td>
                    <td><p>{patente}</p></td>
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
          <div className="no_seleccionado">{icono_error}       {error}</div>
          <button className="formulario__boton siguiente"
            onClick={() =>{
              if(seleccion()){
              dispatch({
                type: PROXIMA_PANTALLA,
                payload: [Boolean(semirremolque_seleccionado)],
              })}
            }}
          >
            Siguiente
          </button>
      </div>

    </div>
  );
};

export default Cargar_viaje_3;
