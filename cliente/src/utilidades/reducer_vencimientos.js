export const acciones_vencimientos = {
  CARGAR_VENCIMIENTOS: 0,
};

export const estadoInicial_vencimientos = {
  sinSeguro: [],
  seguroVencido: [],
  sinTarjetaRuta: [],
  tarjetaRutaVencida: [],
  sinTecnica: [],
  tecnicaVencida: [],
  choferes: [],
};

export const reducer_vencimientos = (estado, accion) => {
  const { payload, tipo } = accion;
  switch (tipo) {
    case acciones_vencimientos.CARGAR_VENCIMIENTOS: {
      return payload;
    }
    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
