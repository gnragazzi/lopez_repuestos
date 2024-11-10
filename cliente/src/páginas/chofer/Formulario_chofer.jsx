import { MdReportGmailerrorred } from "react-icons/md";
import { useContextoGlobal } from "../../Contexto";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";

const Formulario_chofer = () => {
  const axiosPrivado = useAxiosPrivado();
  const navegador = useNavigate();
  const {
    estado_choferes: {
      datos_chofer,
      datos_anteriores,
      datos_chofer: {
        dni,
        cuil,
        nombre,
        apellido,
        domicilio,
        telefono,
        fecha_nacimiento,
        fecha_psicotecnico,
      },
      esModificacion,
      /*datos_anteriores: { dni: dni_anterior, cuil: cuil_anterior },*/
      inputs,
      inputs: { flag_formulario },
      choferes_activos,
      choferes_inactivos,
    },
    dispatch_choferes: dispatch,
    acciones_choferes: {
      RESETEAR_CHOFER,
      ERROR_SERVIDOR,
      PROXIMA_PANTALLA,
      VALIDAR_INPUTS,
      SELECCIONAR_DNI,
      SELECCIONAR_CUIL,
      SELECCIONAR_NOMBRE,
      SELECCIONAR_APELLIDO,
      SELECCIONAR_DOMICILIO,
      SELECCIONAR_TELEFONO,
      SELECCIONAR_FECHA_NACIMIENTO,
      SELECCIONAR_FECHA_PSICOTECNICO,
    },
    setEstadoModal,
  } = useContextoGlobal();

  const validarCampos = () => {
    const regex = /[^\w|\s|áéíóú|,|.]/i;
    const regexDNI = /\D/g;
    let esValido = true;
    let cambiaron_campos = false;
    const nuevosInputs = {
      dni: "",
      cuil: "",
      nombre: "",
      apellido: "",
      domicilio: "",
      telefono: "",
      fecha_nacimiento: "",
      fecha_psicotecnico: "",
    };

    if (esModificacion) {
      const chofer_actual = Object.entries(datos_chofer);
      const chofer_anterior = Object.entries(datos_anteriores);

      for (let i = 0; i < chofer_actual.length; i++) {
        const [, valor_actual] = chofer_actual[i];
        const [, valor_anterior] = chofer_anterior[i];
        if (valor_actual != valor_anterior) {
          cambiaron_campos = true;
          break;
        }
      }
    } else {
      cambiaron_campos = true;
    }
    if (!cambiaron_campos) {
      esValido = false;
      return { esValido, cambiaron_campos };
    }

    if (dni.length < 1) {
      nuevosInputs.dni = "El campo no puede estar vacio, ingrese un dato.";
      esValido = false;
    } else if (regexDNI.test(dni)) {
      nuevosInputs.dni = "Utilice unicamente números.";
      esValido = false;
    } else if (dni.length > 8) {
      nuevosInputs.dni = "El dni no puede tener más de 8 dígitos.";
      esValido = false;
    } else if (choferes_activos.filter((ch) => ch.dni == dni).length > 0) {
      nuevosInputs.dni =
        "El DNI ingresado se encuentra asociado a otro Chofer.";
      esValido = false;
    } else if (choferes_inactivos.filter((ch) => ch.dni == dni).length > 0) {
      if (!esModificacion) {
        const chofer = choferes_inactivos.filter((ch) => ch.dni == dni)[0];

        setEstadoModal({
          activo: true,
          mensaje: `El DNI ingresado ya se encuentra asociado al chofer inactivo ${chofer.nombre} ${chofer.apellido}. ¿Desea darle nuevamente de alta?`,
          accion: () => {
            axiosPrivado
              .patch(`/empleados?id=${chofer.dni}`, {
                ...chofer,
                esActivo: true,
              })
              .then(() => {
                toast.success(
                  `🛠 Se ha dado de alta a ${chofer.nombre} ${chofer.apellido} 🛠`,
                  {
                    position: "top-center",
                    style: { textAlign: "center" },
                    autoClose: 2000,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    icon: false,
                    closeButton: false,
                    pauseOnHover: false,
                    bodyClassName: "toast_class",
                  }
                );
                dispatch({ tipo: RESETEAR_CHOFER });
                navegador("/empleados/choferes");
              })
              .catch((error) => {
                dispatch({ tipo: ERROR_SERVIDOR, payload: error.message });
              });
            setEstadoModal({ activo: false, mensaje: "", accion: null });
          },
        });
      }
      esValido = false;
      nuevosInputs.dni =
        "El DNI ingresado se encuentra asociado a un Chofer inactivo";
    }
    if (cuil.length < 1) {
      nuevosInputs.cuil = "El campo no puede estar vacio, ingrese un dato.";
      esValido = false;
    } else if (regexDNI.test(cuil)) {
      nuevosInputs.cuil = "Utilice unicamente números.";
      esValido = false;
    } else if (cuil.length > 11) {
      nuevosInputs.cuil = "El cuil no puede tener más de 11 dígitos.";
      esValido = false;
    } else if (!cuil.match(dni)) {
      nuevosInputs.cuil = "El CUIL no contiene el DNI";
      esValido = false;
    } else if (
      choferes_activos.filter((ch) => {
        ch.cuil === cuil;
      }).length > 0 ||
      choferes_inactivos.filter((ch) => ch.cuil == cuil).length > 0
    ) {
      nuevosInputs.cuil =
        "El CUIL ingresado se encuentra asociado a otro Chofer.";
      esValido = false;
    } /*else if (esModificacion && dni != dni_anterior && cuil == cuil_anterior) {
      nuevosInputs.cuil =
        "Ha cambiado el DNI del chofer, por favor, cambie también el CUIL.";
      esValido = false;
    }*/
    if (nombre.length < 1) {
      //Nombre
      nuevosInputs.nombre = "El campo no puede estar vacio, ingrese un dato.";
      esValido = false;
    } else if (regex.test(nombre)) {
      nuevosInputs.nombre = "Utilice unicamente letras, números o comas.";
      esValido = false;
    } else if (nombre.length > 20) {
      nuevosInputs.nombre = "Debe utilizar menos de 20 caracteres.";
      esValido = false;
    }

    // Apellido
    if (apellido.length < 1) {
      nuevosInputs.apellido = "El campo no puede estar vacio, ingrese un dato.";
      esValido = false;
    } else if (regex.test(apellido)) {
      nuevosInputs.apellido =
        "Utilice unicamente letras, números, comas o puntos.";
      esValido = false;
    } else if (apellido.length > 20) {
      nuevosInputs.apellido = "Debe utilizar menos de 20 caracteres.";
      esValido = false;
    }
    // Domicilio
    if (domicilio.length < 1) {
      nuevosInputs.domicilio =
        "El campo no puede estar vacio, ingrese un dato.";
      esValido = false;
    } else if (regex.test(domicilio)) {
      nuevosInputs.domicilio = "Utilice unicamente letras, números o comas.";
      esValido = false;
    } else if (domicilio.length > 45) {
      nuevosInputs.domicilio = "Debe utilizar menos de 45 caracteres.";
      esValido = false;
    }
    // Telefono
    if (telefono.length < 1) {
      nuevosInputs.telefono = "El campo no puede estar vacio, ingrese un dato.";
      esValido = false;
    } else if (regex.test(telefono)) {
      nuevosInputs.telefono = "Utilice unicamente números.";
      esValido = false;
    } else if (telefono.length > 16) {
      nuevosInputs.telefono = "Debe utilizar menos de 16 caracteres.";
      esValido = false;
    }

    // FECHA DE NACIMIENTO
    if (fecha_nacimiento.length < 1) {
      nuevosInputs.fecha_nacimiento = "Ingrese una Fecha";
      esValido = false;
    } else if (
      new Date() - 18 * 365 * 24 * 60 * 60 * 1000 <
      new Date(fecha_nacimiento).getTime()
    ) {
      nuevosInputs.fecha_nacimiento = "El chofer no puede ser menor de 18 años";
      esValido = false;
    }

    nuevosInputs.flag_formulario = true;
    dispatch({ tipo: VALIDAR_INPUTS, payload: nuevosInputs });
    return { esValido, cambiaron_campos };
  };

  return (
    <>
      <h2 className="">Ingrese los datos del Chofer</h2>
      <form className="form-table formulario_grid">
        <fieldset className="form__items-grid">
          <legend className="form__legend">Ingrese el DNI</legend>
          <div className="mensaje__error">
            {inputs.dni && <MdReportGmailerrorred title={inputs.dni} />}
          </div>
          <input
            className={`items__input input__textarea ${
              inputs.dni ? "error" : ""
            }`}
            type="text"
            maxLength={8}
            placeholder={"DNI"}
            value={dni}
            onChange={(e) => {
              const regex = /\D/g;
              const input = e.target.value;
              if (!regex.test(input)) {
                dispatch({
                  tipo: SELECCIONAR_DNI,
                  payload: input,
                });
              }
            }}
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
        {/* FIN DNI */}
        <fieldset className="form__items-grid">
          <legend className="form__legend">CUIL</legend>
          <div className="mensaje__error">
            {inputs.cuil && <MdReportGmailerrorred title={inputs.cuil} />}
          </div>
          <input
            className={`items__input input__textarea ${
              inputs.cuil ? "error" : ""
            }`}
            placeholder="CUIL"
            type="text"
            maxLength={11}
            value={cuil}
            onChange={(e) => {
              const regex = /\D/g;
              const input = e.target.value;
              if (!regex.test(input)) {
                dispatch({
                  tipo: SELECCIONAR_CUIL,
                  payload: e.target.value,
                });
              }
            }}
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
        {/* NOMBRE Y APELLIDO */}
        <fieldset className="form__items-grid">
          <legend className="form__legend">Nombre</legend>
          <div className="mensaje__error">
            {inputs.nombre && <MdReportGmailerrorred title={inputs.nombre} />}
          </div>
          <input
            className={`items__input ${inputs.nombre ? "error" : ""}`}
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => {
              dispatch({
                tipo: SELECCIONAR_NOMBRE,
                payload: e.target.value,
              });
            }}
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>

        <fieldset className="form__items-grid">
          <legend className="form__legend">Apellido</legend>
          <div className="mensaje__error">
            {inputs.apellido && (
              <MdReportGmailerrorred title={inputs.apellido} />
            )}
          </div>
          <input
            className={`items__input ${inputs.apellido ? "error" : ""}`}
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => {
              dispatch({
                tipo: SELECCIONAR_APELLIDO,
                payload: e.target.value,
              });
            }}
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
        {/* DOMICILIO */}
        <fieldset className="form__items-grid">
          <legend className="form__legend">Domicilio</legend>
          <div className="mensaje__error">
            {inputs.domicilio && (
              <MdReportGmailerrorred title={inputs.domicilio} />
            )}
          </div>
          <input
            className={`items__input ${inputs.domicilio ? "error" : ""}`}
            type="text"
            placeholder="Domicilio"
            value={domicilio}
            onChange={(e) => {
              dispatch({
                tipo: SELECCIONAR_DOMICILIO,
                payload: e.target.value,
              });
            }}
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
        {/* TELEFONO */}
        <fieldset className="form__items-grid">
          <legend className="form__legend">Teléfono</legend>
          <div className="mensaje__error">
            {inputs.telefono && (
              <MdReportGmailerrorred title={inputs.telefono} />
            )}
          </div>
          <input
            className={`items__input ${inputs.telefono ? "error" : ""}`}
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => {
              dispatch({
                tipo: SELECCIONAR_TELEFONO,
                payload: e.target.value,
              });
            }}
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>

        {/* FECHA NACIMIENTO */}
        <fieldset className="form__items-grid">
          <legend className="form__legend">Fecha de Nacimiento</legend>
          <div className="mensaje__error">
            {inputs.fecha_nacimiento && (
              <MdReportGmailerrorred title={inputs.fecha_nacimiento} />
            )}
          </div>
          <input
            className={`items__input ${
              inputs.fecha_nacimiento ? "error" : ""
            }}`}
            type="date"
            value={fecha_nacimiento}
            onChange={(e) => {
              dispatch({
                tipo: SELECCIONAR_FECHA_NACIMIENTO,
                payload: e.target.value,
              });
            }}
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
        {/* FECHA PSICOTÉCNICO */}
        <fieldset className="form__items-grid">
          <legend className="form__legend">Fecha del Psicotecnico</legend>
          <div className="mensaje__error">
            {inputs.fecha_psicotecnico && (
              <MdReportGmailerrorred title={inputs.fecha_psicotecnico} />
            )}
          </div>
          <input
            className={`items__input ${
              inputs.fecha_psicotecnico ? "error" : ""
            }}`}
            type="date"
            value={fecha_psicotecnico}
            onChange={(e) => {
              dispatch({
                tipo: SELECCIONAR_FECHA_PSICOTECNICO,
                payload: e.target.value,
              });
            }}
            onBlur={flag_formulario ? validarCampos : undefined}
          />
        </fieldset>
      </form>
      <div className="botonera_formulario">
        <button
          className="formulario__boton volver"
          onClick={() => navegador("/empleados/choferes")}
        >
          Volver
        </button>
        <button
          className="formulario__boton siguiente"
          onClick={() => {
            const { esValido, cambiaron_campos } = validarCampos();
            esValido
              ? dispatch({ tipo: PROXIMA_PANTALLA })
              : cambiaron_campos
              ? toast.error("Verifique la Información Ingresada", {
                  position: "top-center",
                  autoClose: 1500,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  icon: false,
                  closeButton: false,
                  style: { textAlign: "center" },
                  pauseOnHover: false,
                  bodyClassName: "toast_class",
                })
              : toast.error("Debe modificar al menos un campo.", {
                  position: "top-center",
                  autoClose: 1500,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  icon: false,
                  closeButton: false,
                  style: { textAlign: "center" },
                  pauseOnHover: false,
                  bodyClassName: "toast_class",
                });
          }}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Formulario_chofer;
