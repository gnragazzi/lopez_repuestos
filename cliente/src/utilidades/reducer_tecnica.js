export const acciones_tecnica = {
  PROXIMA_PANTALLA: 0,
  PANTALLA_ANTERIOR: 1,
  SELECCIONAR_FECHA_EMISION: 2,
  SELECCIONAR_FECHA_VENCIMIENTO: 3,
  SELECCIONAR_UBICACION: 4,
};

export const estadoInicial_tecnica = (vehiculoSeleccionado = "") => ({
  cuerpo_cargar_tecnica: {
    fecha_emision: new Date().toISOString().substring(0, 10),
    fecha_vencimiento: new Date().toISOString.substring(0, 10),
    ubicacion: "",
    vehiculo: {
      vehiculoSeleccionado,
    },
  },
  pantalla: 0,
  inputs: {
    ubicacion: "",
    flag_formulario: false,
  },
});

export const reducer_tecnica = (estado, accion) => {
  const { payload } = accion;
  switch (accion.type) {
    case acciones_tecnica.PROXIMA_PANTALLA: {
      if (pantalla == 0 || pantalla == 1) {
        return { ...estado, pantalla: estado.pantalla + 1 };
      }
    }
    case acciones_tecnica.PANTALLA_ANTERIOR: {
      return { ...estado, pantalla: estado.pantalla - 1 };
    }
    case acciones_tecnica.SELECCIONAR_FECHA_EMISION: {
      return { ...estado, cuerpo_cargar_tecnica: {
        ...estado.cuerpo_cargar_tecnica,
        fecha_emision: payload,
      }};
    }
    case acciones_tecnica.SELECCIONAR_FECHA_VENCIMIENTO: {
      return { ...estado, cuerpo_cargar_tecnica: {
        ...estado.cuerpo_cargar_tecnica,
        fecha_emision: payload,
      }};
    }
    case acciones_tecnica.SELECCIONAR_UBICACION: {
      return { ...estado, cuerpo_cargar_tecnica:{
        ...estado.cuerpo_cargar_tecnica,
        ubicacion: payload,
      } };
    }
    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
