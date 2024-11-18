export const acciones_vencimientos = {
  CARGAR_VENCIMIENTOS: 0,
  POBLAR_LISTA: 1,
  DESCARTAR_ITEM: 2,
  ACTUALIZAR_LISTA_VENCIMIENTOS: 3,
};

export const estadoInicial_vencimientos = {
  sinSeguro: [],
  seguroVencido: [],
  sinTarjetaRuta: [],
  tarjetaRutaVencida: [],
  sinTecnica: [],
  tecnicaVencida: [],
  choferes: [],
  lista: [],
  flagCargado: false,
  listaModificada: false,
};

export const reducer_vencimientos = (estado, accion) => {
  const { payload, tipo } = accion;
  switch (tipo) {
    case acciones_vencimientos.CARGAR_VENCIMIENTOS: {
      return {
        ...payload,
        lista: estado.lista,
        flagCargado: estado.flagCargado,
        listaModificada: estado.listaModificada,
      };
    }
    case acciones_vencimientos.POBLAR_LISTA: {
      return {
        ...estado,
        lista: payload,
        flagCargado: true,
        listaModificada: false,
      };
    }
    case acciones_vencimientos.DESCARTAR_ITEM: {
      const nueva_lista = estado.lista.filter(({ id }) => id != payload);
      return {
        ...estado,
        lista: nueva_lista,
        listaModificada: true,
      };
    }
    case acciones_vencimientos.ACTUALIZAR_LISTA_VENCIMIENTOS: {
      console.log("ACTUALIZAR_LISTA_VENCIMIENTOS", payload);
      return {
        ...estado,
      };
    }
    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
