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
    <div>
      <h2>Selección de Chofer</h2>
      <h4>Seleccione el Chofer para el viaje</h4>
      <ul>
        <li className="vehiculos_lista header_lista">
          <p>Marca</p>
          <p>DNI</p>
        </li>
        {lista_choferes.map((chofer) => {
          const { dni, marca } = chofer;
          return (
            <li
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
              <p>{marca}</p>
              <p>{dni}</p>
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
            payload: [Boolean(chofer_seleccionado)],
          })
        }
      >
        siguiente
      </button>
    </div>
  );
};

export default Cargar_viaje_3;
