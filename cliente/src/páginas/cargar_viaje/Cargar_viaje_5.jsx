import { useState } from "react";
import { MdReportGmailerrorred } from "react-icons/md";

/* eslint-disable react/prop-types */
function Cargar_viaje_5({ dispatch, acciones, estado }) {
  const [errores, setErrores] = useState({
    destino: "",
    kilometros: "",
    combustible: "",
    peso: "",
  });

  const validarCampos = () => {
    let esValido = true;
    const nuevosErrores = {
      destino: "",
      kilometros: "",
      combustible: "",
      peso: "",
    };

    if (!destino.trim()) {
      nuevosErrores.destino = "El campo no puede estar vacio, ingrese un dato.";
      esValido = false;
    }

    if (kilometros_realizados <= 0) {
      nuevosErrores.kilometros = "Los kilometros deben ser mayor a 0.";
      esValido = false;
    }

    if(kilometros_realizados == ""){
      nuevosErrores.kilometros = "El campo no puede estar vacio, ingrese un dato.";
      esValido = false;
    }

    if (costos_combustibles < 0) {
      nuevosErrores.combustible = "El costo del combustible no puede ser negativo.";
      esValido = false;
    }

    if(costos_combustibles == ""){
      nuevosErrores.combustible = "El campo no puede estar vacio, ingrese un dato.";
      esValido = false;
    }

    if (peso < 0) {
      nuevosErrores.peso = "El peso no puede ser negativo.";
      esValido = false;
    }

    if(peso == ""){
      nuevosErrores.peso = "El campo no puede estar vacio, ingrese un dato";
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  const {
    PROXIMA_PANTALLA,
    PANTALLA_ANTERIOR,
    SELECCIONAR_DESTINO,
    SELECCIONAR_KILOMETROS_REALIZADOS,
    SELECCIONAR_COSTO_COMBUSTIBLE,
    SELECCIONAR_PESO,
  } = acciones;

  const {
    cuerpo_cargar_viaje: { destino, kilometros_realizados, costos_combustibles, peso },
  } = estado;

  return (
    <div className="App formulario">
      <h2>Detalles</h2>
      <form className="form-table form__mantenimiento">
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Destino del viaje</legend>
          <div className="mensaje__error">
            {errores.destino && (
              <MdReportGmailerrorred title={errores.destino} />
            )}
          </div>
          <textarea
            className={`items__input input__textarea ${errores.destino ? "error" : ""}`}
            placeholder="Destino"
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_DESTINO,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Kilómetros realizados</legend>
          <div className="mensaje__error">
            {errores.kilometros && (
              <MdReportGmailerrorred title={errores.kilometros}/>
            )}
          </div>
          <input
            className={`items__input ${errores.kilometros ? "error" : ""}`}
            placeholder="Ingrese los kilómetros realizados en el viaje"
            type="number"
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_KILOMETROS_REALIZADOS,
                payload: e.target.value,
              })
            }
          />
        </fieldset>
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Costos Combustibles</legend>
          <div className="mensaje__error">
            {errores.combustible && (
              <MdReportGmailerrorred title={errores.combustible}/>
            )}
          </div>
          <input
            className={`items__input ${errores.combustible ? "error" : ""}`}
            placeholder="Ingrese el costo del combustible"
            type="number"
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_COSTO_COMBUSTIBLE,
                payload: e.target.value,
              })
            }
          />
        </fieldset>
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Peso (en Kg)</legend>
          <div className="mensaje__error">
            {errores.peso && (
              <MdReportGmailerrorred title={errores.peso}/>
            )}
          </div>
          <input
            className={`items__input ${errores.peso ? "error" : ""}`}
            placeholder="Ingrese el peso de la carga"
            type="number"
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_PESO,
                payload: e.target.value,
              })
            }
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
                payload: [Boolean(destino), Boolean(kilometros_realizados), Boolean(costos_combustibles)],
              });
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