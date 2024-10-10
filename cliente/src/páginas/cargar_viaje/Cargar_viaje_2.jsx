import axios from "axios";
import { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";


/* eslint-disable react/prop-types */
function Cargar_viaje_2({ dispatch, acciones, estado }) {
  
  const [error,setError]=useState("");
  const [icono_error,setIcono_Error]=useState("");
 
  const seleccion = () => {
    if(camion_seleccionado){
      setError("");
      setIcono_Error("");
      return true;
    }
    setError("Debe elegir un camion para poder avanzar")
    setIcono_Error(MdErrorOutline);
    return false;

  }

  const {
    CARGAR_FILTROS,
    PROXIMA_PANTALLA,
    SELECCIONAR_VEHICULO,
    CARGAR_LISTA_CAMION,
    PANTALLA_ANTERIOR,
  } = acciones;
  const {
    lista_camiones,
    cuerpo_cargar_viaje: { camion: camion_seleccionado },
    filtros: { camiones: filtro_camion },
  } = estado;
  useEffect(() => {
    // obtener viajes cuyas fechas se superpongan con las elegidas en el punto anterior, de manera de descartar camiones y
    //semirremolques utilizados en esos viajes

    axios
      .get(
        `http://localhost:8080/viajes?fecha_partida=${estado.cuerpo_cargar_viaje.fecha_partida}&fecha_llegada=${estado.cuerpo_cargar_viaje.fecha_llegada}`
      )
      .then((res) => {
        const filtros = res.data.reduce(
          (acc, viaje) => {
            acc.choferes.push(viaje.chofer.dni);
            acc.camiones.push(viaje.camion.patente);
            acc.semirremolques.push(viaje.semirremolque.patente);
            return acc;
          },
          { camiones: [], choferes: [], semirremolques: [] }
        );
        dispatch({ type: CARGAR_FILTROS, payload: filtros });
        // get camiones
        axios
          .get("http://localhost:8080/vehiculos?tipo=camion", {
            headers: {
              Accept: "application/json",
            },
          })
          .then((res) => {
            dispatch({
              type: CARGAR_LISTA_CAMION,
              payload: res.data,
            });
          })
          .catch((error) => console.log(error));
      });
  }, []);
  return (
    <div className="App formulario">
      <h2>Selección de Camión</h2>
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
            {lista_camiones.map((camion) => {
              const { patente, marca } = camion;
              return (
                <tr
                  className={
                    filtro_camion.includes(patente)
                      ? "vehiculos_lista no_disponible"
                      : camion_seleccionado == patente
                      ? "vehiculos_lista vehiculos_lista_seleccionado_viaje"
                      : "vehiculos_lista disponible"
                  }
                  key={patente}
                  onClick={
                    filtro_camion.includes(patente)
                      ? () => {
                          console.log("No se puede seleccionar");
                        }
                      : () => {
                          dispatch({
                            type: SELECCIONAR_VEHICULO,
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
        <button className="formulario__boton volver" onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}>
          Volver
        </button>
        <div className="no_seleccionado">{icono_error}       {error}</div>
        <button className="formulario__boton siguiente" 
          onClick={() =>{
            if (seleccion()){
            dispatch({
              type: PROXIMA_PANTALLA,
              payload: [Boolean(camion_seleccionado)],
            })}
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Cargar_viaje_2;
