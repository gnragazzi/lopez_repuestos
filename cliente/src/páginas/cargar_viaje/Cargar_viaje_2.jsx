import axios from "axios";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
function Cargar_viaje_2({ dispatch, acciones, estado }) {
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
    <div>
      <h2>Selección de Camión</h2>
      <h4>Seleccione el vehículo para el viaje</h4>
      <ul>
        <li className="vehiculos_lista header_lista">
          <p>Marca</p>
          <p>Patente</p>
        </li>
        {lista_camiones.map((camion) => {
          const { patente, marca } = camion;
          return (
            <li
              className={
                filtro_camion.includes(patente)
                  ? "vehiculos_lista no_disponible"
                  : camion_seleccionado == patente
                  ? "vehiculos_lista vehiculos_lista_seleccionado"
                  : "vehiculos_lista"
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
              <p>{marca}</p>
              <p>{patente}</p>
            </li>
          );
        })}
      </ul>

      <button onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}>
        Pantalla anterior
      </button>
      <button
        onClick={() =>
          dispatch({
            type: PROXIMA_PANTALLA,
            payload: [Boolean(camion_seleccionado)],
          })
        }
      >
        siguiente
      </button>
    </div>
  );
}

export default Cargar_viaje_2;
