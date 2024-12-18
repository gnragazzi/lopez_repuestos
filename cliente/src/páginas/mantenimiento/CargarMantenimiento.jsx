import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  acciones_cargar_mantenimiento,
  estadoInicial_cargar_mantenimiento,
  reducer_cargar_mantenimiento,
} from "../../utilidades/reducer_cargar_mantenimiento.js";
import Cargar_M1 from "./Cargar_M1.jsx";
import Cargar_M2 from "./Cargar_M2.jsx";
import Cargar_M3 from "./Cargar_M3.jsx";
import Cargar_M4 from "./Cargar_M4.jsx";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado.jsx";
import {
  notificacion_error,
  notificacion_exito,
} from "../../utilidades/toast_modificados.js";
// crear componentes para mostrar información

const CargarMantenimiento = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const axiosPrivado = useAxiosPrivado();
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
    if (costo_repuestos < 0) {
      nuevosInputs.costo_repuestos =
        "El costo de los repuestos no puede ser negativo.";
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
    console.log(cuerpo_cargar_mantenimiento);
    axiosPrivado
      .post("/mantenimiento", cuerpo_cargar_mantenimiento)
      .then(() => {
        notificacion_exito("🛠 Cargado Correctamente 🛠");
        navegar("/mantenimiento");
        dispatch({ type: RESETEAR_CUERPO_MANTENIMIENTO });
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    setError("");
    setCargando(true);
    dispatch({ type: RESETEAR_CUERPO_MANTENIMIENTO });
    axiosPrivado
      .get("/vehiculos")
      .then((res) => {
        setCargando(false);
        dispatch({ type: CARGAR_LISTA_VEHÍCULOS, payload: res.data });
      })
      .catch((error) => {
        setCargando(false);
        setError(error.message);
      });
    axiosPrivado
      .get("/empleados?tipo=mecánico&activo=true")
      .then((res) => {
        setCargando(false);
        dispatch({ type: CARGAR_LISTA_MECÁNICOS, payload: res.data });
      })
      .catch((error) => {
        setCargando(false);
        setError(error.message);
      });
  }, [
    CARGAR_LISTA_MECÁNICOS,
    CARGAR_LISTA_VEHÍCULOS,
    RESETEAR_CUERPO_MANTENIMIENTO,
    axiosPrivado,
  ]);

  if (cargando) {
    return <h1>Cargando...</h1>;
  } else if (error) {
    return (
      <>
        <h1>{error}</h1>
      </>
    );
  } else
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
                        : notificacion_error(
                            "Verifique los valores ingresados"
                          );
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
