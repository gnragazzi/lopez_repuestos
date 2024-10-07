/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";

const Cargar_viaje_3 = ({ dispatch, acciones, estado }) => {
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
    <div>
      <h2>Selección de Semirremolque</h2>
      <h4>Seleccione el vehículo para el viaje</h4>
      <ul>
        <li className="vehiculos_lista header_lista">
          <p>Marca</p>
          <p>Patente</p>
        </li>
        {lista_semirremolques.map((semirremolque) => {
          const { patente, marca } = semirremolque;
          return (
            <li
              className={
                filtro_semirremolque.includes(patente)
                  ? "vehiculos_lista no_disponible"
                  : semirremolque_seleccionado == patente
                  ? "vehiculos_lista vehiculos_lista_seleccionado"
                  : "vehiculos_lista"
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
            payload: [Boolean(semirremolque_seleccionado)],
          })
        }
      >
        siguiente
      </button>
    </div>
  );
};

export default Cargar_viaje_3;
