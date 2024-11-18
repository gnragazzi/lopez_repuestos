export const acciones_tecnica = {
  SELECCIONAR_VEHICULO: 0,
  RESETEAR_ESTADO: 1,
  PROXIMA_PAGINA_TECNICA: 2,
  ANTERIOR_PAGINA_TECNICA: 3,
  SELECCIONAR_FECHA_EMISION: 4,
  SELECCIONAR_FECHA_VENCIMIENTO: 5,
  SELECCIONAR_UBICACION: 6,
  CARGAR_TECNICA: 7,
  ES_CAMION_TECNICA: 8,
  CARGAR_DESDE_VENCIMIENTO: 9,
};

export const estadoInicial_tecnica = {
  vehiculo_seleccionado: "",
  fecha_emision: new Date().toISOString().substring(0, 10),
  fecha_vencimiento: new Date().toISOString().substring(0, 10),
  ubicacion: "",
  pagina_tecnica: 0,
  ultima_tecnica: {
    fecha_emision: new Date().toISOString().substring(0, 10),
    fecha_vencimiento: new Date().toISOString().substring(0, 10),
    ubicacion: "",
  },
  esCamion: "",
  idVencimiento: null,
};

export const reducer_tecnica = (estado, accion) => {
  const { payload } = accion;
  switch (accion.type) {
    case acciones_tecnica.SELECCIONAR_VEHICULO: {
      return { ...estado, vehiculo_seleccionado: payload };
    }
    case acciones_tecnica.RESETEAR_ESTADO: {
      return estadoInicial_tecnica;
    }

    case acciones_tecnica.PROXIMA_PAGINA_TECNICA: {
      return { ...estado, pagina_tecnica: estado.pagina_tecnica + 1 };
    }
    case acciones_tecnica.ANTERIOR_PAGINA_TECNICA: {
      return { ...estado, pagina_tecnica: estado.pagina_tecnica - 1 };
    }
    case acciones_tecnica.SELECCIONAR_FECHA_EMISION: {
      return {
        ...estado,
        fecha_emision: payload,
      };
    }
    case acciones_tecnica.SELECCIONAR_FECHA_VENCIMIENTO: {
      return {
        ...estado,
        fecha_vencimiento: payload,
      };
    }
    case acciones_tecnica.SELECCIONAR_UBICACION: {
      return {
        ...estado,
        ubicacion: payload,
      };
    }
    case acciones_tecnica.CARGAR_TECNICA: {
      return {
        ...estado,
        ultima_tecnica: payload,
      };
    }
    case acciones_tecnica.ES_CAMION_TECNICA: {
      return {
        ...estado,
        esCamion: payload,
      };
    }
    case acciones_tecnica.CARGAR_DESDE_VENCIMIENTO: {
      const { vehiculo_seleccionado, esCamion, idVencimiento } = payload;
      return {
        ...estado,
        vehiculo_seleccionado,
        esCamion,
        idVencimiento,
      };
    }
    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
