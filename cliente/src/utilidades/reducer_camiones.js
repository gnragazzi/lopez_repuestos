export const acciones_camiones = {
  CARGAR_LISTA_CAMIONES: 0,
  SELECCIONAR_CAMION: 1,
  PROXIMA_PAGINA_COSTOS: 2,
  ANTERIOR_PAGINA_COSTOS: 3,
  SELECCIONAR_MES: 4,
  SELECCIONAR_AÑO: 5,
  CARGAR_COSTO: 6,
  RESETEAR_ESTADO: 7,
};

export const estadoInicial_camiones = {
  lista_camiones: [],
  camion_seleccionado: "",
  mes_costo: 0,
  año_costo: 2024,
  costos: {
    costo_repuestos: 0,
    cost_mano_de_obra: 0,
    costo_combustible: 0,
    kilometros_realizados: 0,
    costos_por_kilometros: 0,
  },
  pagina_costos: 0,
};

export const reducer_camiones = (estado, accion) => {
  const { payload } = accion;
  switch (accion.type) {
    case acciones_camiones.CARGAR_LISTA_CAMIONES: {
      return { ...estado, lista_camiones: payload };
    }
    case acciones_camiones.SELECCIONAR_CAMION: {
      return { ...estado, camion_seleccionado: payload };
    }
    case acciones_camiones.PROXIMA_PAGINA_COSTOS: {
      return { ...estado, pagina_costos: estado.pagina_costos + 1 };
    }
    case acciones_camiones.ANTERIOR_PAGINA_COSTOS: {
      return { ...estado, pagina_costos: estado.pagina_costos - 1 };
    }
    case acciones_camiones.SELECCIONAR_MES: {
      return { ...estado, mes_costo: payload };
    }
    case acciones_camiones.SELECCIONAR_AÑO: {
      return { ...estado, año_costo: payload };
    }
    case acciones_camiones.CARGAR_COSTO: {
      return { ...estado, costos: payload };
    }
    case acciones_camiones.RESETEAR_ESTADO: {
      return estadoInicial_camiones;
    }
    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
