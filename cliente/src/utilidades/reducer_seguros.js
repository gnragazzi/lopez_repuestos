export const acciones_seguro = {
  SELECCIONAR_VEHICULO: 0,
  PROXIMA_PAGINA_SEGURO: 1,
  ANTERIOR_PAGINA_SEGURO: 2,
  SELECCIONAR_FECHA_EMISION: 3,
  SELECCIONAR_FECHA_VENCIMIENTO: 4,
  SELECCIONAR_PAGO: 5,
  SELECCIONAR_TIPO: 6,
  SELECCIONAR_NOMBRE_ASEGURADORA: 7,
  RESETEAR_ESTADO: 8,
  CARGAR_SEGURO: 9,
};

export const estadoInicial_seguro = {
  vehiculo_seleccionado: "",
  fecha_emision: new Date().toISOString().substring(0, 10),
  fecha_vencimiento: new Date().toISOString().substring(0, 10),
  pago: 0,
  tipo: "",
  nombre_aseguradora: "",
  pagina_seguro: 0,
  ultimo_seguro: {
    fecha_emision: new Date().toISOString().substring(0, 10),
    fecha_vencimiento: new Date().toISOString().substring(0, 10),
    pago: 0,
    tipo: "",
    nombre_aseguradora: "",
  },
};

export const reducer_seguro = (estado, accion) => {
  const { payload } = accion;
  switch (accion.type) {
    case acciones_seguro.PROXIMA_PAGINA_SEGURO: {
      return { ...estado, pagina_seguro: estado.pagina_seguro + 1 };
    }
    case acciones_seguro.ANTERIOR_PAGINA_SEGURO: {
      return { ...estado, pagina_seguro: estado.pagina_seguro - 1 };
    }
    case acciones_seguro.SELECCIONAR_VEHICULO: {
      return { ...estado, vehiculo_seleccionado: payload };
    }
    case acciones_seguro.SELECCIONAR_FECHA_EMISION: {
      return { ...estado, fecha_emision: payload };
    }
    case acciones_seguro.SELECCIONAR_FECHA_VENCIMIENTO: {
      return { ...estado, fecha_vencimiento: payload };
    }
    case acciones_seguro.SELECCIONAR_PAGO: {
      return { ...estado, pago: payload };
    }
    case acciones_seguro.SELECCIONAR_TIPO: {
      return { ...estado, tipo: payload };
    }
    case acciones_seguro.SELECCIONAR_NOMBRE_ASEGURADORA: {
      return { ...estado, nombre_aseguradora: payload };
    }
    case acciones_seguro.RESETEAR_ESTADO: {
      return estadoInicial_seguro;
    }
    case acciones_seguro.CARGAR_SEGURO: {
      return { ...estado, ultimo_seguro: payload};
    }
    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
