export const acciones_camiones = {
  CARGAR_LISTA_CAMIONES: 0,
  SELECCIONAR_CAMION: 1,
  PROXIMA_PAGINA_COSTOS: 2,
  ANTERIOR_PAGINA_COSTOS: 3,
  SELECCIONAR_MES: 4,
  SELECCIONAR_AÑO: 5,
  CARGAR_COSTO_MANTENIMIENTO: 6,
  CARGAR_COSTO_VIAJE: 7,
  CARGAR_COSTOS_POR_KILOMETROS: 8,
  RESETEAR_ESTADO: 9,
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
    case acciones_camiones.CARGAR_COSTO_MANTENIMIENTO: {
      const { costo_repuestos, cost_mano_de_obra } = payload;
      return {
        ...estado,
        costos: {
          ...estado.costos,
          cost_mano_de_obra,
          costo_repuestos,
        },
      };
    }
    case acciones_camiones.CARGAR_COSTO_VIAJE: {
      const { costo_combustible, kilometros_realizados } = payload;
      return {
        ...estado,
        costos: {
          ...estado.costos,
          costo_combustible,
          kilometros_realizados,
        },
      };
    }
    case acciones_camiones.CARGAR_COSTOS_POR_KILOMETROS: {
      return {
        ...estado,
        costos: {
          ...estado.costos,
          costos_por_kilometros: estado.costos.kilometros_realizados
            ? (estado.costos.costo_combustible +
                estado.costos.cost_mano_de_obra +
                estado.costos.costo_repuestos) /
              estado.costos.kilometros_realizados
            : 0,
        },
      };
    }
    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
