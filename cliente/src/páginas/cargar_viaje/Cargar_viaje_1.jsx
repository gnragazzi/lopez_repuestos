import { Link } from "react-router-dom";
import { useState } from "react";
import { MdReportGmailerrorred } from "react-icons/md";

/* eslint-disable react/prop-types */
function Cargar_viaje_1({ dispatch, acciones, estado }) {
  
  const [fechainvalida, setFechainvalida] = useState("");
  const validarFechas = () => {
    const partida = new Date(fecha_partida);
    const llegada = new Date(fecha_llegada);
  
    if (llegada < partida) {
      setFechainvalida(MdReportGmailerrorred);
      return false;
    }

    setFechainvalida("");
    return true;
  };
  
  const {
    PROXIMA_PANTALLA,
    SELECCIONAR_FECHA_PARTIDA,
    SELECCIONAR_FECHA_LLEGADA,
    SELECCIONAR_FECHA_ESPERADA,
  } = acciones;
  const {
    cuerpo_cargar_viaje: { fecha_llegada, fecha_partida, fecha_esperada },
  } = estado;
  return (
    <div className="App formulario">
      <h2>Por Favor, seleccione las fechas en las que se realizo el viaje</h2>
      <form action="" className="form-table form__mantenimiento">
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Fecha de Partida</legend>
          <input
            className="items__input"
            type="date"
            value={fecha_partida}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_FECHA_PARTIDA,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Fecha de Llegada</legend>
          <div className="mensaje__error" title="La fecha de llegada no puede ser anterior a la fecha de partida. Elija otra fecha valida" >{fechainvalida}</div>
          <input
            className={`items__input ${fechainvalida ? 'error' : ''}`}
            type="date"
            value={fecha_llegada}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_FECHA_LLEGADA,
                payload: e.target.value,
              });
            }}
          />
        </fieldset >
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Fecha Esperada</legend>
          <input
            className="items__input"
            type="date"
            value={fecha_esperada}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_FECHA_ESPERADA,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>
      </form>
      <div className="botonera_formulario">
        <button className="formulario__boton volver"><Link   to="/viajes" style={{textDecoration:'none', color:'#000'}}>Volver</Link></button>
      <button className="formulario__boton siguiente" 
        onClick={() =>{
          if(validarFechas()){
            dispatch({
            type: PROXIMA_PANTALLA,
            //hay que validar las fechas unas contra otras (por ejemplo, fecha de partida no puede ser posterior a fecha de llegada)
            payload: [
              Boolean(fecha_partida),
              Boolean(fecha_llegada),
              Boolean(fecha_esperada),
            ],
          })}
        }}
      >
        Siguiente
      </button>
      </div>
    </div>
  );
}

export default Cargar_viaje_1;
