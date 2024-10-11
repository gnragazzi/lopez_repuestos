export const acciones_cargar_viaje = {
  PROXIMA_PANTALLA: 0,
  PANTALLA_ANTERIOR: 1,
  CARGAR_LISTA_CAMION: 2,
  CARGAR_LISTA_SEMIRREMOLQUE: 3,
  CARGAR_LISTA_CHOFER: 4,
  SELECCIONAR_VEHICULO: 5,
  SELECCIONAR_DESTINO: 6,
  SELECCIONAR_KILOMETROS_REALIZADOS: 7,
  SELECCIONAR_COSTO_COMBUSTIBLE: 8,
  SELECCIONAR_FECHA_PARTIDA: 9,
  SELECCIONAR_FECHA_LLEGADA: 10,
  SELECCIONAR_FECHA_ESPERADA: 11,
  SELECCIONAR_PESO: 12,
  SELECCIONAR_SEMIRREMOLQUE: 13,
  SELECCIONAR_CHOFER: 14,
  RESETEAR_CUERPO_VIAJE: 15,
  CARGAR_FILTROS: 16,
};

export const estadoInicial_cargar_viaje = {
  cuerpo_cargar_viaje: {
    fecha_partida: new Date().toISOString().substring(0, 10),
    fecha_llegada: new Date().toISOString().substring(0, 10),
    fecha_esperada: new Date().toISOString().substring(0, 10),
    kilometros_realizados: 0,
    costos_combustibles: 0,
    destino: "",
    camion: "",
    peso: 0,
    semirremolque: "",
    chofer: "",
  },
  filtros: [],
  lista_camiones: [],
  lista_semirremolques: [],
  lista_choferes: [],
  pantalla: 0,
  chofer: "",
};

export const reducer_cargar_viaje = (estado, accion) => {
  switch (accion.type) {
    case acciones_cargar_viaje.PROXIMA_PANTALLA: {
      return accion.payload.includes(false)
        ? estado
        : { ...estado, pantalla: estado.pantalla + 1 };
    }
    case acciones_cargar_viaje.PANTALLA_ANTERIOR: {
      return { ...estado, pantalla: estado.pantalla - 1 };
    }
    case acciones_cargar_viaje.CARGAR_LISTA_CAMION: {
      return { ...estado, lista_camiones: accion.payload };
    }
    case acciones_cargar_viaje.CARGAR_LISTA_CHOFER: {
      return { ...estado, lista_choferes: accion.payload };
    }
    case acciones_cargar_viaje.CARGAR_LISTA_SEMIRREMOLQUE: {
      return { ...estado, lista_semirremolques: accion.payload };
    }
    case acciones_cargar_viaje.SELECCIONAR_VEHICULO: {
      const patente = accion.payload;
      return estado.cuerpo_cargar_viaje.camion === patente
        ? {
            ...estado,
            cuerpo_cargar_viaje: { ...estado.cuerpo_cargar_viaje, camion: "" },
          }
        : {
            ...estado,
            cuerpo_cargar_viaje: {
              ...estado.cuerpo_cargar_viaje,
              camion: patente,
            },
          };
    }
    case acciones_cargar_viaje.SELECCIONAR_DESTINO: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          destino: accion.payload,
        },
      };
    }
    case acciones_cargar_viaje.SELECCIONAR_KILOMETROS_REALIZADOS: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          kilometros_realizados: accion.payload,
        },
      };
    }
    case acciones_cargar_viaje.SELECCIONAR_COSTO_COMBUSTIBLE: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          costos_combustibles: accion.payload,
        },
      };
    }
    case acciones_cargar_viaje.CARGAR_FILTROS: {
      return {
        ...estado,
        filtros: accion.payload,
      };
    }
    case acciones_cargar_viaje.SELECCIONAR_FECHA_PARTIDA: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          fecha_partida: accion.payload,
        },
      };
    }
    case acciones_cargar_viaje.SELECCIONAR_FECHA_LLEGADA: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          fecha_llegada: accion.payload,
        },
      };
    }
    case acciones_cargar_viaje.SELECCIONAR_FECHA_ESPERADA: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          fecha_esperada: accion.payload,
        },
      };
    }
    case acciones_cargar_viaje.SELECCIONAR_PESO: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          peso: accion.payload,
        },
      };
    }
    case acciones_cargar_viaje.SELECCIONAR_CHOFER: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          chofer: accion.payload,
        },
      };
    }
    case acciones_cargar_viaje.SELECCIONAR_SEMIRREMOLQUE: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          semirremolque: accion.payload,
        },
      };
    }
    case acciones_cargar_viaje.RESETEAR_CUERPO_VIAJE:
      return estadoInicial_cargar_viaje;

    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
