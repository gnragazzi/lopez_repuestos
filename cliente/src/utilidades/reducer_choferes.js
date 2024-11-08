export const acciones_choferes = {
  CONSULTADO_SERVIDOR: 1,
  ERROR_SERVIDOR: 2,
  CARGAR_CHOFERES: 3,
  BAJA_CHOFER: 4,
};

export const estadoInicial_choferes = {
  choferes_activos: [],
  choferes_inactivos: [],
  error: false,
  cargando: false,
};

export const reducer_choferes = (estado, accion) => {
  const { payload, tipo } = accion;

  switch (tipo) {
    case acciones_choferes.CONSULTADO_SERVIDOR: {
      return { ...estado, error: "", cargando: true };
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
    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
