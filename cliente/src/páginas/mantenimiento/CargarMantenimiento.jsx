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
    cuerpo_cargar_mantenimiento: {
      trabajos_realizados,
      costo_repuestos,
      costo_manodeobra,
      kilometros_en_que_se_realizo,
      vehiculo: { esCamion },
    },
  } = estado;

  const {
    PROXIMA_PANTALLA,
    PANTALLA_ANTERIOR,
    CARGAR_LISTA_VEHÍCULOS,
    CARGAR_LISTA_MECÁNICOS,
    RESETEAR_CUERPO_MANTENIMIENTO,
    VALIDAR_INPUTS,
  } = acciones_cargar_mantenimiento;

  const { pantalla, cuerpo_cargar_mantenimiento } = estado;

  const validarCampos = () => {
    const regex = /[^\w|\s|áéíóú|,]/i;
    let esValido = true;
    const nuevosInputs = {
      trabajos_realizados: "",
      costo_repuestos: "",
      costo_manodeobra: "",
      kilometros_en_que_se_realizo: "",
    };

    if (trabajos_realizados.length < 1) {
      nuevosInputs.trabajos_realizados =
        "El campo no puede estar vacio, ingrese un dato.";
      esValido = false;
    } else if (regex.test(trabajos_realizados)) {
      nuevosInputs.trabajos_realizados =
        "Utilice unicamente letras, números o comas.";
      esValido = false;
    } else if (trabajos_realizados.length > 45) {
      nuevosInputs.trabajos_realizados =
        "Debe utilizar menos de 45 caracteres.";
      esValido = false;
    }
    if (costo_repuestos <= 0) {
      nuevosInputs.costo_repuestos = "El costo debe ser mayor a 0.";
      esValido = false;
    }
    if (costo_repuestos == "") {
      nuevosInputs.costo_repuestos = "Ingrese un número válido.";
      esValido = false;
    }

    if (costo_manodeobra < 0) {
      nuevosInputs.costo_manodeobra =
        "El costo de la mano de obra no puede ser negativo.";
      esValido = false;
    }

    if (costo_manodeobra == "") {
      nuevosInputs.costo_manodeobra = "Ingrese un número válido.";
      esValido = false;
    }

    if (esCamion) {
      if (kilometros_en_que_se_realizo < 0) {
        nuevosInputs.kilometros_en_que_se_realizo =
          "El kilometraje del camión no puede ser negativo.";
        esValido = false;
      }
      if (kilometros_en_que_se_realizo == "") {
        nuevosInputs.kilometros_en_que_se_realizo = "Ingrese un número válido";
        esValido = false;
      }
    }
    nuevosInputs.flag_formulario = true;
    dispatch({ type: VALIDAR_INPUTS, payload: nuevosInputs });
    return esValido;
  };
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
          validarCampos={validarCampos}
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
            onClick={
              pantalla != 2
                ? () => {
                    dispatch({
                      type: PROXIMA_PANTALLA,
                    });
                  }
                : () => {
                    validarCampos()
                      ? dispatch({
                          type: PROXIMA_PANTALLA,
                        })
                      : undefined;
                  }
            }
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
