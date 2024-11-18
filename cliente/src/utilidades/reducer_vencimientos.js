export const acciones_vencimientos = {
  CARGAR_VENCIMIENTOS: 0,
  POBLAR_LISTA: 1,
  DESCARTAR_ITEM: 2,
  ACTUALIZAR_LISTA_VENCIMIENTOS: 3,
  SE_MODIFICO_LISTA: 4,
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
  numeroNotificaciones: 0,
  seModificoLista: false,
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
        numeroNotificaciones: estado.numeroNotificaciones,
        seModificoLista: false,
      };
    }
    case acciones_vencimientos.POBLAR_LISTA: {
      return {
        ...estado,
        lista: payload,
        flagCargado: true,
        listaModificada: false,
        numeroNotificaciones: payload.length,
        seModificoLista: false,
      };
    }
    case acciones_vencimientos.DESCARTAR_ITEM: {
      const nueva_lista = estado.lista.filter(({ id }) => id != payload);
      return {
        ...estado,
        lista: nueva_lista,
        listaModificada: true,
        numeroNotificaciones: estado.numeroNotificaciones - 1,
      };
    }
    case acciones_vencimientos.SE_MODIFICO_LISTA: {
      return { ...estado, seModificoLista: true };
    }
    case acciones_vencimientos.ACTUALIZAR_LISTA_VENCIMIENTOS: {
      const {
        fecha_vencimiento: [año, mes, dia],
        idVencimiento,
        esCamion,
        origen,
      } = payload;
      let lista_nueva = [...estado.lista];
      const fecha_nueva = new Date(
        parseInt(año),
        parseInt(mes) - 1, // meses basados en índice 0
        parseInt(dia)
      );
      const hastaVencimiento = Math.ceil(
        (fecha_nueva.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      const yaVencio = hastaVencimiento <= 0;

      if (hastaVencimiento <= 30) {
        lista_nueva.forEach((e) => {
          if (e.id == idVencimiento) {
            e.titulo = `${origen} de ${esCamion ? "Camión" : "Semirremolque"} ${
              yaVencio
                ? "Vencida"
                : `por Vencer en ${hastaVencimiento} día${
                    hastaVencimiento > 1 ? "s" : ""
                  }`
            }`;
            e.fecha = {
              año,
              mes,
              dia,
            };
          }
        });
      } else {
        lista_nueva = lista_nueva.filter((e) => {
          return e.id != idVencimiento;
        });
      }
      console.log(lista_nueva);
      lista_nueva.sort(({ fecha: a }, { fecha: b }) => {
        if (!a) return -1;
        else if (!b) return 1;
        return (
          new Date(a.año, a.mes - 1, a.dia).getTime() -
          new Date(b.año, b.mes - 1, b.dia).getTime()
        );
      });
      return {
        ...estado,
        lista: lista_nueva,
        numeroNotificaciones: lista_nueva.length,
      };
    }
    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};
