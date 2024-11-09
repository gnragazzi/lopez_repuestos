import { useContextoGlobal } from "../../Contexto";
import { useState } from "react";
import { MdReportGmailerrorred } from "react-icons/md";

const Cargar_1 = ({ ubicacionInvalida, setUbicacionInvalida }) => {
  const {
    acciones_tecnica: {
      SELECCIONAR_FECHA_EMISION,
      SELECCIONAR_FECHA_VENCIMIENTO,
      SELECCIONAR_UBICACION,
    },
    dispatch_tecnica: dispatch,
    estado_tecnica: estado,
  } = useContextoGlobal();

  const [fechainvalida, setFechainvalida] = useState("");
  const regex = /^[\w\sáéíóú,]*$/i; // Solo permite letras, números, espacios, acentos y comas

  return (
    <>
      <h2>Cargar Técnica</h2>
      <form className="form-table form__mantenimiento">
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Fecha emisión</legend>
          <input
            type="date"
            name="fecha_emision"
            id="fecha_emision"
            className="items__input"
            value={estado.fecha_emision}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_FECHA_EMISION,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Fecha vencimiento</legend>
          <div className="mensaje__error">
            {fechainvalida && (
              <MdReportGmailerrorred title={fechainvalida}/>
            )}
          </div>
          <input
            type="date"
            name="fecha_vencimiento"
            id="fecha_vencimiento"
            className={`items__input ${fechainvalida ? 'error' : ''}`}
            value={estado.fecha_vencimiento}
            onChange={(e) => {
              const emision = new Date(estado.fecha_emision);
              const vencimiento = new Date(e.target.value);

              if (vencimiento < emision) {
                setFechainvalida("La fecha de vencimiento no puede ser anterior a la fecha de emisión. Elija una fecha valida.");
              } else {
                setFechainvalida("");
              }

              dispatch({
                type: SELECCIONAR_FECHA_VENCIMIENTO,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Ubicación</legend>
          <div className="mensaje__error">
            {ubicacionInvalida && (
              <MdReportGmailerrorred title={ubicacionInvalida}/>
            )}
          </div>
          <input
            type="text"
            name="ubicacion"
            id="ubicacion"
            className={`items__input ${ubicacionInvalida ? 'error' : ''}`}
            value={estado.ubicacion}
            onChange={(e) => {
              const value = e.target.value;
              if (!regex.test(value)) {
                setUbicacionInvalida("La ubicación solo puede contener letras, números, espacios, acentos y comas");
              } else if (value.trim() === "") {
                setUbicacionInvalida("El campo de ubicación no puede estar vacío");
              } else {
                setUbicacionInvalida("");
              }

              dispatch({
                type: SELECCIONAR_UBICACION,
                payload: value,
              });
            }}
          />
        </fieldset>
      </form>
    </>
  );
};

export default Cargar_1;