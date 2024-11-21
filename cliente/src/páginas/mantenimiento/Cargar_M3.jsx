import { BsSpeedometer2 } from "react-icons/bs";
import { MdReportGmailerrorred } from "react-icons/md";
/* eslint-disable react/prop-types */
const Cargar_M3 = ({ dispatch, estado, acciones, validarCampos }) => {
  const {
    SELECCIONAR_TRABAJO_REALIZADO,
    SELECCIONAR_COSTO_REPUESTOS,
    SELECCIONAR_COSTO_MANODEOBRA,
    SELECCIONAR_KILOMETROS_EN_QUE_SE_REALIZO,
    SELECCIONAR_FECHA,
  } = acciones;

  const {
    cuerpo_cargar_mantenimiento: {
      trabajos_realizados,
      costo_repuestos,
      costo_manodeobra,
      kilometros_en_que_se_realizo,
      fecha,
      vehiculo: { vehiculoSeleccionado, esCamion },
    },
    lista_vehículos,
    inputs,
    inputs: { flag_formulario },
  } = estado;
  return (
    <>
      <h2>Detalles</h2>
      <form className="form-table form__mantenimiento">
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Ingrese el trabajo</legend>
          <div className="mensaje__error">
            {inputs.trabajos_realizados && (
              <MdReportGmailerrorred title={inputs.trabajos_realizados} />
            )}
          </div>
          <input
            className={`items__input input__textarea ${
              inputs.trabajos_realizados ? "error" : ""
            }`}
            type="text"
            placeholder="Ingrese el trabajo que se hizo"
            value={trabajos_realizados}
            onChange={(e) => {
              dispatch({
                type: SELECCIONAR_TRABAJO_REALIZADO,
                payload: e.target.value,
              });
            }}
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Costo de Repuesto</legend>
          <div className="mensaje__error">
            {inputs.costo_repuestos && (
              <MdReportGmailerrorred title={inputs.costo_repuestos} />
            )}
          </div>
          <input
            className={`items__input input__textarea ${
              inputs.costo_repuestos ? "error" : ""
            }`}
            placeholder="Costo de Repuesto"
            type="number"
            value={costo_repuestos}
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_COSTO_REPUESTOS,
                payload: e.target.value,
              })
            }
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
        <fieldset className="form__items-mantenimiento">
          <legend className="form__legend">Costo de Mano de Obra</legend>
          <div className="mensaje__error">
            {inputs.costo_manodeobra && (
              <MdReportGmailerrorred title={inputs.costo_manodeobra} />
            )}
          </div>
          <input
            className={`items__input input__textarea ${
              inputs.costo_manodeobra ? "error" : ""
            }`}
            placeholder="Costo de Mano de Obra"
            type="number"
            value={costo_manodeobra}
            onChange={(e) =>
              dispatch({
                type: SELECCIONAR_COSTO_MANODEOBRA,
                payload: e.target.value,
              })
            }
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
        {esCamion && (
          <fieldset className="form__items-mantenimiento">
            <legend className="form__legend">
              Kilómetros del camión en que se realizó el mantenimiento
            </legend>
            <div className="mensaje__error">
              {inputs.kilometros_en_que_se_realizo && (
                <MdReportGmailerrorred
                  title={inputs.kilometros_en_que_se_realizo}
                />
              )}
            </div>
            <input
              className={`items__input input__textarea ${
                esCamion && inputs.kilometros_en_que_se_realizo ? "error" : ""
              }`}
              placeholder="Kilometros del camión"
              type="number"
              value={kilometros_en_que_se_realizo}
              onChange={(e) =>
                dispatch({
                  type: SELECCIONAR_KILOMETROS_EN_QUE_SE_REALIZO,
                  payload: e.target.value,
                })
              }
              onBlur={flag_formulario ? validarCampos : undefined}
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
            value={fecha}
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
