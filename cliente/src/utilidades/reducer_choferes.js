export const acciones_choferes = {
  CONSULTANDO_SERVIDOR: 1,
  ERROR_SERVIDOR: 2,
  CARGAR_CHOFERES: 3,
  BAJA_CHOFER: 4,
  CARGAR_DATOS_CHOFER: 5,
  VALIDAR_INPUTS: 6,
  SELECCIONAR_DNI: 7,
  SELECCIONAR_CUIL: 8,
  SELECCIONAR_NOMBRE: 9,
  SELECCIONAR_APELLIDO: 10,
  SELECCIONAR_DOMICILIO: 11,
  SELECCIONAR_TELEFONO: 12,
  SELECCIONAR_FECHA_NACIMIENTO: 13,
  SELECCIONAR_FECHA_PSICOTECNICO: 14,
  RESETEAR_CHOFER: 15,
  PROXIMA_PANTALLA: 16,
  PANTALLA_ANTERIOR: 17,
  FORMULARIO_ALTA: 18,
};

const choferVacio = {
  dni: "",
  cuil: "",
  nombre: "",
  apellido: "",
  domicilio: "",
  fecha_nacimiento: "",
  telefono: "",
  fecha_psicotecnico: "",
  esActivo: false,
};

const input_inicial = {
  dni: "",
  cuil: "",
  nombre: "",
  apellido: "",
  domicilio: "",
  telefono: "",
  flag_formulario: false,
  esValido: false,
};

export const estadoInicial_choferes = {
  pantalla: 0,
  choferes_activos: [],
  choferes_inactivos: [],
  error: false,
  cargando: false,
  datos_chofer: choferVacio,
  datos_anteriores: choferVacio,
  esModificacion: false,
  inputs: input_inicial,
};

export const reducer_choferes = (estado, accion) => {
  const { payload, tipo } = accion;

  switch (tipo) {
    case acciones_choferes.CONSULTANDO_SERVIDOR: {
      return { ...estadoInicial_choferes, error: "", cargando: true };
    }
    case acciones_choferes.ERROR_SERVIDOR: {
      return { ...estado, error: payload, cargando: false };
    }
    case acciones_choferes.CARGAR_CHOFERES: {
      const { activos, inactivos } = payload;
      return {
        ...estado,
        cargando: false,
        choferes_activos: activos,
        choferes_inactivos: inactivos,
      };
    }
    case acciones_choferes.BAJA_CHOFER: {
      let baja = {};
      const activos = estado.choferes_activos.filter((ch) => {
        if (ch.dni != payload) return true;
        else {
          baja = ch;
          return false;
        }
      });
      return {
        ...estado,
        choferes_activos: activos,
        choferes_inactivos: [...estado.choferes_inactivos, baja],
      };
    }
    case acciones_choferes.CARGAR_DATOS_CHOFER: {
      const activos = estado.choferes_activos.filter(
        (ch) => payload.dni != ch.dni
      );
      return {
        ...estado,
        choferes_activos: activos,
        datos_chofer: payload,
        datos_anteriores: payload,
        esModificacion: true,
      };
    }
    case acciones_choferes.SELECCIONAR_DNI: {
      return {
        ...estado,
        datos_chofer: {
          ...estado.datos_chofer,
          dni: payload,
        },
      };
    }
    case acciones_choferes.SELECCIONAR_CUIL: {
      return {
        ...estado,
        datos_chofer: {
          ...estado.datos_chofer,
          cuil: payload,
        },
      };
    }
    case acciones_choferes.SELECCIONAR_NOMBRE: {
      return {
        ...estado,
        datos_chofer: {
          ...estado.datos_chofer,
          nombre: payload,
        },
      };
    }
    case acciones_choferes.SELECCIONAR_APELLIDO: {
      return {
        ...estado,
        datos_chofer: {
          ...estado.datos_chofer,
          apellido: payload,
        },
      };
    }
    case acciones_choferes.SELECCIONAR_DOMICILIO: {
      return {
        ...estado,
        datos_chofer: {
          ...estado.datos_chofer,
          domicilio: payload,
        },
      };
    }
    case acciones_choferes.SELECCIONAR_TELEFONO: {
      return {
        ...estado,
        datos_chofer: {
          ...estado.datos_chofer,
          telefono: payload,
        },
      };
    }
    case acciones_choferes.SELECCIONAR_FECHA_NACIMIENTO: {
      return {
        ...estado,
        datos_chofer: {
          ...estado.datos_chofer,
          fecha_nacimiento: payload,
        },
      };
    }
    case acciones_choferes.SELECCIONAR_FECHA_PSICOTECNICO: {
      return {
        ...estado,
        datos_chofer: {
          ...estado.datos_chofer,
          fecha_psicotecnico: payload,
        },
      };
    }
    case acciones_choferes.RESETEAR_CHOFER: {
      return estadoInicial_choferes;
    }
    case acciones_choferes.FORMULARIO_ALTA: {
      return {
        ...estado,
        pantalla: 0,
      };
    }
    case acciones_choferes.PROXIMA_PANTALLA: {
      return {
        ...estado,
        pantalla: estado.pantalla + 1,
      };
    }
    case acciones_choferes.PANTALLA_ANTERIOR: {
      return {
        ...estado,
        pantalla: estado.pantalla - 1,
      };
    }
    case acciones_choferes.VALIDAR_INPUTS: {
      return {
        ...estado,
        inputs: payload,
      };
    }

    default:
      throw new Error(`ERROR: "${tipo}" no es una acción reconocida...`);
  }
};
