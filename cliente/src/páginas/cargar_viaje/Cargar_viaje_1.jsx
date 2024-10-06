import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Cargar_viaje_1({ dispatch, acciones, estado }) {
  const {
    PROXIMA_PANTALLA,
    SELECCIONAR_VEHICULO,
    SELECCIONAR_DESTINO,
    SELECCIONAR_KILOMETROS_REALIZADOS,
    SELECCIONAR_COSTO_COMBUSTIBLE,
    CARGAR_LISTA_CAMION,
    CARGAR_LISTA_CHOFER,
    CARGAR_LISTA_SEMIRREMOLQUE,
  } = acciones;
  const {
    lista_vehiculos: lista_camiones,
    cuerpo_cargar_viaje: {
      camion: camion_seleccionado,
      destinos,
      kilometros_realizados,
      costos_combustibles,
    },
  } = estado;
  useEffect(() => {
    // obtener viajes cuyas fechas se superpongan con las elegidas en el punto anterior, de manera de descartar camiones y
    //semirremolques utilizados en esos viajes

    axios
      .get(
        `http://localhost:8080/viajes?fecha_partida=${estado.cuerpo_cargar_viaje.fecha_partida}&fecha_llegada=${estado.cuerpo_cargar_viaje.fecha_llegada}`
      )
      .then((res) => {
        const viajes = res.data;
        // get camiones
        axios
          .get("http://localhost:8080/vehiculos?tipo=camion", {
            headers: {
              Accept: "application/json",
            },
          })
          .then((res) => {
            const filtroCamiones = viajes.map((viaje) => {
              return viaje.camion.patente;
            });

            dispatch({
              type: CARGAR_LISTA_CAMION,
              payload: res.data.filter((camion) => {
                return !filtroCamiones.includes(camion.patente);
              }),
            });
          })
          .catch((error) => console.log(error));
        axios
          .get("http://localhost:8080/vehiculos?tipo=semirremolque", {
            headers: {
              Accept: "application/json",
            },
          })
          .then((res) => {
            const filtroSemirremolque = viajes.map((viaje) => {
              return viaje.semirremolque.patente;
            });

            dispatch({
              type: CARGAR_LISTA_SEMIRREMOLQUE,
              payload: res.data.filter((semirremolque) => {
                return !filtroSemirremolque.includes(semirremolque.patente);
              }),
            });
          })
          .catch((error) => console.log(error));
        axios
          .get("http://localhost:8080/empleados?tipo=chofer", {
            headers: {
              Accept: "application/json",
            },
          })
          .then((res) => {
            const filtroChoferes = viajes.map((viaje) => {
              return viaje.chofer.dni;
            });

            dispatch({
              type: CARGAR_LISTA_CHOFER,
              payload: res.data.filter((chofer) => {
                return !filtroChoferes.includes(chofer.patente);
              }),
            });
          })
          .catch((error) => console.log(error));
      });
  }, []);
  /*
  return (
    <div>
      <h2>Cargar_viaje_1</h2>
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
                camion_seleccionado == patente
                  ? "vehiculos_lista vehiculos_lista_seleccionado"
                  : "vehiculos_lista"
              }
              key={patente}
              onClick={() => {
                dispatch({ type: SELECCIONAR_VEHICULO, payload: patente });
              }}
            >
              <p>{marca}</p>
              <p>{patente}</p>
            </li>
          );
        })}
      </ul>
      <form>
        <fieldset>
          <legend>Ingrese el destino del viaje</legend>
          <textarea
            placeholder="destino"
            value={destinos}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_DESTINO,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>
        <fieldset>
          <legend>3. kilometros_realizados: </legend>

          <input
            placeholder="3. kilometros_realizados: "
            type="number"
            value={kilometros_realizados}
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_KILOMETROS_REALIZADOS,
                payload: e.target.value,
              })
            }
          />
        </fieldset>
        <fieldset>
          <legend>4. costos_combustibles: </legend>

          <input
            placeholder="3. kilometros_realizados: 0"
            type="number"
            value={costos_combustibles}
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_COSTO_COMBUSTIBLE,
                payload: e.target.value,
              })
            }
          />
        </fieldset>
      </form>
      <Link to="/viajes">
        <button>Volver</button>
      </Link>
      <button
        onClick={() =>
          dispatch({
            type: PROXIMA_PANTALLA,
            payload: [
              Boolean(camion_seleccionado),
              Boolean(destinos),
              Boolean(kilometros_realizados),
              Boolean(costos_combustibles),
            ],
          })
        }
      >
        siguiente
      </button>
    </div>
  );*/
  return <h2>veamo&apos: si funciona</h2>;
}

export default Cargar_viaje_1;
