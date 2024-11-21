import { MdReportGmailerrorred } from "react-icons/md";
import { notificacion_error } from "../../utilidades/toast_modificados";

/* eslint-disable react/prop-types */
function Cargar_viaje_5({ dispatch, acciones, estado }) {
  const validarCampos = () => {
    const regex = /[^\w|\s|áéíóú|,]/i;
    let esValido = true;
    const nuevosInputs = {
      destino: "",
      kilometros: "",
      combustible: "",
      peso: "",
    };

    if (destino.length < 1) {
      nuevosInputs.destino = "El campo no puede estar vacio, ingrese un dato.";
      esValido = false;
    } else if (regex.test(destino)) {
      nuevosInputs.destino = "Utilice unicamente letras, números o comas.";
      esValido = false;
    } else if (destino.length > 45) {
      nuevosInputs.destino = "Ingrese un destino de menos de 45 caracteres.";
      esValido = false;
    }
    if (kilometros_realizados <= 0) {
      nuevosInputs.kilometros = "Los kilometros deben ser mayor a 0.";
      esValido = false;
    }
    if (kilometros_realizados == "") {
      nuevosInputs.kilometros = "Ingrese un número válido.";
      esValido = false;
    }

    if (costos_combustibles < 0) {
      nuevosInputs.combustible =
        "El costo del combustible no puede ser negativo.";
      esValido = false;
    }

    if (costos_combustibles == "") {
      nuevosInputs.combustible = "Ingrese un número válido.";
      esValido = false;
    }

    if (peso < 0) {
      nuevosInputs.peso = "El peso no puede ser negativo.";
      esValido = false;
    }

    if (peso == "") {
      nuevosInputs.peso = "Ingrese un número válido";
      esValido = false;
    }
    nuevosInputs.flag_formulario = true;
    dispatch({ type: VALIDAR_INPUTS, payload: nuevosInputs });
    return esValido;
  };

  const {
    PROXIMA_PANTALLA,
    PANTALLA_ANTERIOR,
    SELECCIONAR_DESTINO,
    SELECCIONAR_KILOMETROS_REALIZADOS,
    SELECCIONAR_COSTO_COMBUSTIBLE,
    SELECCIONAR_PESO,
    VALIDAR_INPUTS,
  } = acciones;

  const {
    cuerpo_cargar_viaje: {
      destino,
      kilometros_realizados,
      costos_combustibles,
      peso,
    },
    inputs,
    inputs: { flag_formulario },
  } = estado;

  return (
    <div className="App formulario">
      <h2>Detalles</h2>
      <form className="form-table form__mantenimiento">
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Destino del viaje</legend>
          <div className="mensaje__error">
            {inputs.destino && <MdReportGmailerrorred title={inputs.destino} />}
          </div>
          <input
            className={`items__input input__textarea ${
              inputs.destino ? "error" : ""
            }`}
            type="text"
            placeholder="Destino"
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_DESTINO,
                payload: e.target.value,
              });
            }}
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Kilómetros realizados</legend>
          <div className="mensaje__error">
            {inputs.kilometros && (
              <MdReportGmailerrorred title={inputs.kilometros} />
            )}
          </div>
          <input
            className={`items__input ${inputs.kilometros ? "error" : ""}`}
            placeholder="Ingrese los kilómetros realizados en el viaje"
            type="number"
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_KILOMETROS_REALIZADOS,
                payload: e.target.value,
              })
            }
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Costos Combustibles</legend>
          <div className="mensaje__error">
            {inputs.combustible && (
              <MdReportGmailerrorred title={inputs.combustible} />
            )}
          </div>
          <input
            className={`items__input ${inputs.combustible ? "error" : ""}`}
            placeholder="Ingrese el costo del combustible"
            type="number"
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_COSTO_COMBUSTIBLE,
                payload: e.target.value,
              })
            }
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Peso (en Kg)</legend>
          <div className="mensaje__error">
            {inputs.peso && <MdReportGmailerrorred title={inputs.peso} />}
          </div>
          <input
            className={`items__input ${inputs.peso ? "error" : ""}`}
            placeholder="Ingrese el peso de la carga"
            type="number"
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_PESO,
                payload: e.target.value,
              })
            }
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
      </form>

      <div className="botonera_formulario">
        <button
          className="formulario__boton volver"
          onClick={() => dispatch({ type: PANTALLA_ANTERIOR })}
        >
          Volver
        </button>
        <button
          className="formulario__boton siguiente"
          onClick={() => {
            if (validarCampos()) {
              dispatch({
                type: PROXIMA_PANTALLA,
                payload: [
                  Boolean(destino),
                  Boolean(kilometros_realizados),
                  Boolean(costos_combustibles),
                ],
              });
            } else {
              notificacion_error("Verifique la información ingresada");
            }
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Cargar_viaje_5;
