export const acciones_camiones = {
  CARGAR_LISTA_CAMIONES: 0,
  SELECCIONAR_CAMION: 1,
  PROXIMA_PAGINA_COSTOS: 2,
  ANTERIOR_PAGINA_COSTOS: 3,
  SELECCIONAR_MES: 4,
  SELECCIONAR_AÑO: 5,
};

export const estadoInicial_camiones = {
  lista_camiones: [],
  camion_seleccionado: "",
  mes_costo: 0,
  año_costo: 0,
  costos: {},
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
    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
