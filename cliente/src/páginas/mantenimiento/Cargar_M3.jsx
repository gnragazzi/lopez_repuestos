import { BsSpeedometer2 } from "react-icons/bs";
/* eslint-disable react/prop-types */
const Cargar_M3 = ({ dispatch, estado, acciones }) => {
  const {
    SELECCIONAR_TRABAJO_REALIZADO,
    SELECCIONAR_COSTO_REPUESTOS,
    SELECCIONAR_COSTO_MANODEOBRA,
    SELECCIONAR_KILOMETROS_EN_QUE_SE_REALIZO,
    SELECCIONAR_FECHA,
  } = acciones;

  const {
    cuerpo_cargar_mantenimiento,
    cuerpo_cargar_mantenimiento: {
      vehiculo: { vehiculoSeleccionado, esCamion },
    },
    lista_vehículos,
  } = estado;
  return (
    <>
      <h2>Detalles</h2>
      <form className="form-table form__mantenimiento">
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Ingrese el trabajo</legend>
          <textarea
            className="items__input input__textarea"
            placeholder="Ingrese el trabajo que se hizo"
            value={cuerpo_cargar_mantenimiento.trabajos_realizados}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_TRABAJO_REALIZADO,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Costo de Repuesto</legend>
          <input
            className="items__input"
            placeholder="Costo de Repuesto"
            type="number"
            value={cuerpo_cargar_mantenimiento.costo_repuestos}
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_COSTO_REPUESTOS,
                payload: e.target.value,
              })
            }
          />
        </fieldset>
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Costo de Mano de Obra</legend>
          <input
            className="items__input"
            placeholder="Costo de Mano de Obra"
            type="number"
            value={cuerpo_cargar_mantenimiento.costo_manodeobra}
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_COSTO_MANODEOBRA,
                payload: e.target.value,
              })
            }
          />
        </fieldset>
        {esCamion && (
          <fieldset className="form__items-mantenimiento">
            <legend className="form__legend">
              Kilometros del camión en que se realizó el mantenimiento
            </legend>
            <input
              className="items__input"
              placeholder="Kilometros del camión"
              type="number"
              value={cuerpo_cargar_mantenimiento.kilometros_en_que_se_realizo}
              onChange={(e) =>
                dispatch({
                  type: SELECCIONAR_KILOMETROS_EN_QUE_SE_REALIZO,
                  payload: e.target.value,
                })
              }
            />
            <button
              className="formulario__boton kilometros_actuales"
              title="Usar los kilometros actuales"
              onClick={(e) => {
                e.preventDefault();
                dispatch({
                  type: SELECCIONAR_KILOMETROS_EN_QUE_SE_REALIZO,
                  payload: lista_vehículos.filter((v) => {
                    return v.patente == vehiculoSeleccionado;
                  })[0].kilometraje,
                });
              }}
            >
              <BsSpeedometer2 />
            </button>
          </fieldset>
        )}

        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Fecha</legend>
          <input
            className="items__input"
            type="date"
            value={cuerpo_cargar_mantenimiento.fecha}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_FECHA,
                payload: e.target.value,
              });
            }}
          />
        </fieldset>
      </form>
    </>
  );
};

export default Cargar_M3;
