export const acciones_semirremolques = {
  CARGAR_LISTA_SEMIRREMOLQUES: 0,
  SELECCIONAR_SEMIRREMOLQUE: 1,
  RESETEAR_ESTADO: 2,
};

export const estadoInicial_semirremolques = {
  lista_semirremolques: [],
  semirremolque_seleccionado: "",
};

export const reducer_semirremolques = (estado, accion) => {
  const { payload } = accion;
  switch (accion.type) {
    case acciones_semirremolques.CARGAR_LISTA_SEMIRREMOLQUES: {
      return { ...estado, lista_semirremolques: payload };
    }
    case acciones_semirremolques.SELECCIONAR_SEMIRREMOLQUE: {
      return { ...estado, semirremolque_seleccionado: payload };
    }
    case acciones_semirremolques.RESETEAR_ESTADO: {
      return estadoInicial_semirremolques;
    }
    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
