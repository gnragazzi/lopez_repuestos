import { useContextoGlobal } from "../../Contexto";
import { MdReportGmailerrorred } from "react-icons/md";
import { useState } from "react";

const Seguro_1 = ({aseguradoraInvalida,setAseguradoraInvalida, tipoInvalida,setTipoInvalida, pagoInvalido, setPagoInvalido}) => {
  const {
    acciones_seguro: acciones,
    dispatch_seguro: dispatch,
    estado_seguro: estado,
  } = useContextoGlobal();

  const {
    SELECCIONAR_FECHA_EMISION,
    SELECCIONAR_FECHA_VENCIMIENTO,
    SELECCIONAR_NOMBRE_ASEGURADORA,
    SELECCIONAR_PAGO,
    SELECCIONAR_TIPO,
  } = acciones;

  const regex = /^[\w\sáéíóú,]*$/i;
  const [fechainvalida, setFechainvalida] = useState("");

  return (
    <>
      <h2>Ingrese los datos del seguro:</h2>
      <form className="form-table form__mantenimiento">
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Aseguradora</legend>
          <div className="mensaje__error">
            {aseguradoraInvalida && (
              <MdReportGmailerrorred title={aseguradoraInvalida}/>
            )}
          </div>
          <input
            type="text"
            name="nombre_aseguradora"
            id="nombre_aseguradora"
            className={`items__input ${aseguradoraInvalida ? 'error' : ''}`}
            value={estado.nombre_aseguradora}
            onChange={(e) => {
              if (!regex.test(e.target.value)) {
                setAseguradoraInvalida("El nombre de la aseguradora solo puede contener letras, números, espacios, acentos y comas");
              } else if (e.target.value.trim() === "") {
                setAseguradoraInvalida("El campo del nombre de la aseguradora no puede estar vacío");
              } else {
                setAseguradoraInvalida("");
              }
              dispatch({
                type: SELECCIONAR_NOMBRE_ASEGURADORA,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Tipo</legend>
          <div className="mensaje__error">
            {tipoInvalida && (
              <MdReportGmailerrorred title={tipoInvalida}/>
            )}
          </div>
          <input
            type="text"
            name="tipo"
            id="tipo"
            className={`items__input ${tipoInvalida ? 'error' : ''}`}
            value={estado.tipo}
            onChange={(e) => {
              if (!regex.test(e.target.value)) {
                setTipoInvalida("El tipo solo puede contener letras, números, espacios, acentos y comas");
              } else if (e.target.value.trim() === "") {
                setTipoInvalida("El campo del tipo no puede estar vacío");
              } else {
                setTipoInvalida("");
              }
              dispatch({
                type: SELECCIONAR_TIPO,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Pago</legend>
          <div className="mensaje__error">
            {pagoInvalido && (
              <MdReportGmailerrorred title={pagoInvalido}/>
            )}
          </div>
          <input
            type="number"
            name="pago"
            id="pago"
            className={`items__input ${pagoInvalido ? 'error' : ''}`}
            value={estado.pago}
            onChange={(e) => {
              if (e.target.value.trim() === "") {
                setPagoInvalido("El campo del tipo no puede estar vacío");
              } else if (e.target.value < 0) {
                setPagoInvalido("El pago no puede ser negativo. Ingrese un valor valido.");
              } else {
                setPagoInvalido("");
              }
              dispatch({
                type: SELECCIONAR_PAGO,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Emisión</legend>
          <div className="mensaje__error">
            {fechainvalida && (
              <MdReportGmailerrorred title={fechainvalida}/>
            )}
          </div>
          <input
            type="date"
            name="fecha_emision"
            id="fecha_emision"
            className={`items__input ${fechainvalida ? 'error' : ''}`}
            value={estado.fecha_emision}
            onChange={(e) => {
              const emision = new Date(e.target.value);
              const vencimiento = new Date(estado.fecha_vencimiento);

              if (vencimiento < emision) {
                setFechainvalida("La fecha de vencimiento no puede ser anterior a la fecha de emisión. Elija una fecha valida.");
              } else {
                setFechainvalida("");
              }
              
              dispatch({
                type: SELECCIONAR_FECHA_EMISION,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Vencimiento</legend>
          <div className="mensaje__error">
            {fechainvalida && (
              <MdReportGmailerrorred title={fechainvalida}/>
            )}
          </div>
          <input
            type="date"
            name="fecha_emision"
            id="fecha_emision"
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
      </form>
    </>
  );
};

export default Seguro_1;
