import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  acciones_cargar_mantenimiento,
  estadoInicial_cargar_mantenimiento,
  reducer_cargar_mantenimiento,
} from "../../utilidades/reducer_cargar_mantenimiento.js";
import Cargar_M1 from "./Cargar_M1.jsx";
import Cargar_M2 from "./Cargar_M2.jsx";
import Cargar_M3 from "./Cargar_M3.jsx";
import Cargar_M4 from "./Cargar_M4.jsx";

// crear componentes para mostrar información

const CargarMantenimiento = () => {
  const navegar = useNavigate();
  const [estado, dispatch] = useReducer(
    reducer_cargar_mantenimiento,
    estadoInicial_cargar_mantenimiento
  );
  const {
    PROXIMA_PANTALLA,
    PANTALLA_ANTERIOR,
    CARGAR_LISTA_VEHÍCULOS,
    CARGAR_LISTA_MECÁNICOS,
    RESETEAR_CUERPO_MANTENIMIENTO,
  } = acciones_cargar_mantenimiento;

  const { pantalla, cuerpo_cargar_mantenimiento } = estado;

  const enviarFormulario = () => {
    axios
      .post(
        "http://localhost:8080/mantenimiento",
        cuerpo_cargar_mantenimiento,
        {
          headers: { "content-type": "application/json" },
        }
      )
      .then(() => {
        navegar("/mantenimiento");
        dispatch({ type: RESETEAR_CUERPO_MANTENIMIENTO });
      });
  };
  useEffect(() => {
    dispatch({ type: RESETEAR_CUERPO_MANTENIMIENTO });
    axios.create({ timeout: 1000 });
    axios
      .get("http://localhost:8080/vehiculos", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: CARGAR_LISTA_VEHÍCULOS, payload: res.data });
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:8080/empleados?tipo=mecánico", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: CARGAR_LISTA_MECÁNICOS, payload: res.data });
      });
  }, [
    CARGAR_LISTA_MECÁNICOS,
    CARGAR_LISTA_VEHÍCULOS,
    RESETEAR_CUERPO_MANTENIMIENTO,
  ]);
  return (
    <div className="App formulario">
      {/* elegir un vehículo de una lista */}
      {pantalla == 0 && (
        <Cargar_M1
          dispatch={dispatch}
          estado={estado}
          acciones={acciones_cargar_mantenimiento}
        />
      )}
      {pantalla == 1 && (
        <Cargar_M2
          dispatch={dispatch}
          estado={estado}
          acciones={acciones_cargar_mantenimiento}
        />
      )}
      {pantalla == 2 && (
        <Cargar_M3
          dispatch={dispatch}
          estado={estado}
          acciones={acciones_cargar_mantenimiento}
        />
      )}
      {pantalla == 3 && <Cargar_M4 estado={estado} />}

      <div className="botonera_formulario">
        {pantalla == 0 && (
          <button
            className="formulario__boton volver"
            onClick={() => navegar("/mantenimiento")}
          >
            Volver
          </button>
        )}
        {pantalla > 0 && (
          <button
            className="formulario__boton volver"
            onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}
          >
            Volver
          </button>
        )}
        {pantalla < 3 && (
          <button
            className="formulario__boton siguiente"
            onClick={() => {
              dispatch({
                type: PROXIMA_PANTALLA,
              });
            }}
          >
            Siguiente
          </button>
        )}
        {pantalla == 3 && (
          <button
            className="formulario__boton siguiente"
            onClick={enviarFormulario}
          >
            Confirmar
          </button>
        )}
      </div>
    </div>
  );
};

export default CargarMantenimiento;
