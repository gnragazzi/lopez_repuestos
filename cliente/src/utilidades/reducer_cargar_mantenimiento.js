export const acciones_cargar_mantenimiento = {
  PROXIMA_PANTALLA: 0,
  PANTALLA_ANTERIOR: 1,
  CARGAR_LISTA_VEHÍCULOS: 2,
  CARGAR_LISTA_MECÁNICOS: 3,
  RESETEAR_CUERPO_MANTENIMIENTO: 4,
  SELECCIONAR_VEHICULO: 5,
  SELECCIONAR_MECÁNICO: 6,
  SELECCIONAR_TRABAJO_REALIZADO: 8,
  SELECCIONAR_COSTO_REPUESTOS: 9,
  SELECCIONAR_COSTO_MANODEOBRA: 10,
  SELECCIONAR_KILOMETROS_EN_QUE_SE_REALIZO: 11,
  SELECCIONAR_FECHA: 12,
};

export const estadoInicial_cargar_mantenimiento = {
  cuerpo_cargar_mantenimiento: {
    trabajos_realizados: "",
    fecha: new Date().toISOString().substring(0, 10),
    costo_repuestos: 0,
    costo_manodeobra: 0,
    kilometros_en_que_se_realizo: 0,
    vehiculo: {
      vehiculoSeleccionado: "",
      esCamion: "",
    },
    mecanicosSeleccionados: [],
  },
  lista_vehículos: [],
  lista_mecánicos: [],
  pantalla: 0,
};

export const reducer_cargar_mantenimiento = (estado, accion) => {
  const { payload } = accion;
  switch (accion.type) {
    case acciones_cargar_mantenimiento.PROXIMA_PANTALLA: {
      const {
        pantalla,
        cuerpo_cargar_mantenimiento,
        cuerpo_cargar_mantenimiento: {
          vehiculo: { vehiculoSeleccionado },
          mecanicosSeleccionados,
        },
      } = estado;
      if (
        (pantalla == 0 && vehiculoSeleccionado) ||
        (pantalla == 1 && mecanicosSeleccionados.length > 0) ||
        (pantalla == 2 &&
          cuerpo_cargar_mantenimiento.costo_manodeobra &&
          cuerpo_cargar_mantenimiento.costo_repuestos &&
          cuerpo_cargar_mantenimiento.trabajos_realizados &&
          cuerpo_cargar_mantenimiento.fecha)
      ) {
        return { ...estado, pantalla: estado.pantalla + 1 };
      } else return estado;
    }
    case acciones_cargar_mantenimiento.PANTALLA_ANTERIOR: {
      return { ...estado, pantalla: estado.pantalla - 1 };
    }
    case acciones_cargar_mantenimiento.CARGAR_LISTA_VEHÍCULOS: {
      return { ...estado, lista_vehículos: payload };
    }
    case acciones_cargar_mantenimiento.CARGAR_LISTA_MECÁNICOS: {
      return { ...estado, lista_mecánicos: payload };
    }
    case acciones_cargar_mantenimiento.CARGAR_LISTA_CHOFER: {
      return { ...estado, lista_choferes: payload };
    }
    case acciones_cargar_mantenimiento.SELECCIONAR_VEHICULO: {
      const { patente, esCamion } = payload;
      return {
        ...estado,
        cuerpo_cargar_mantenimiento: {
          ...estado.cuerpo_cargar_mantenimiento,
          vehiculo: {
            vehiculoSeleccionado: patente,
            esCamion: esCamion,
          },
        },
      };
    }
    case acciones_cargar_mantenimiento.SELECCIONAR_MECÁNICO: {
      let mecánicos = [
        ...estado.cuerpo_cargar_mantenimiento.mecanicosSeleccionados,
      ];
      if (mecánicos.includes(payload)) {
        mecánicos = mecánicos.filter((m) => m != payload);
      } else {
        mecánicos.push(payload);
      }

      return {
        ...estado,
        cuerpo_cargar_mantenimiento: {
          ...estado.cuerpo_cargar_mantenimiento,
          mecanicosSeleccionados: mecánicos,
        },
      };
    }
    case acciones_cargar_mantenimiento.SELECCIONAR_TRABAJO_REALIZADO: {
      return {
        ...estado,
        cuerpo_cargar_mantenimiento: {
          ...estado.cuerpo_cargar_mantenimiento,
          trabajos_realizados: payload,
        },
      };
    }
    case acciones_cargar_mantenimiento.SELECCIONAR_COSTO_REPUESTOS: {
      return {
        ...estado,
        cuerpo_cargar_mantenimiento: {
          ...estado.cuerpo_cargar_mantenimiento,
          costo_repuestos: payload,
        },
      };
    }
    case acciones_cargar_mantenimiento.SELECCIONAR_COSTO_MANODEOBRA: {
      return {
        ...estado,
        cuerpo_cargar_mantenimiento: {
          ...estado.cuerpo_cargar_mantenimiento,
          costo_manodeobra: payload,
        },
      };
    }
    case acciones_cargar_mantenimiento.SELECCIONAR_KILOMETROS_EN_QUE_SE_REALIZO: {
      return {
        ...estado,
        cuerpo_cargar_mantenimiento: {
          ...estado.cuerpo_cargar_mantenimiento,
          kilometros_en_que_se_realizo: payload,
        },
      };
    }
    case acciones_cargar_mantenimiento.SELECCIONAR_FECHA: {
      return {
        ...estado,
        cuerpo_cargar_mantenimiento: {
          ...estado.cuerpo_cargar_mantenimiento,
          fecha: payload,
        },
      };
    }

    case acciones_cargar_mantenimiento.RESETEAR_CUERPO_MANTENIMIENTO:
      console.log("estado inicial", estadoInicial_cargar_mantenimiento);
      console.log("estado", estado);

      return estadoInicial_cargar_mantenimiento;

    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
