import { useEffect, useReducer } from "react";
import Cargar_viaje_1 from "./Cargar_viaje_1";
import Cargar_viaje_2 from "./Cargar_viaje_2";
import Cargar_viaje_3 from "./Cargar_viaje_3";
import Cargar_viaje_4 from "./Cargar_viaje_4";
import Cargar_viaje_5 from "./Cargar_viaje_5";
import Cargar_viaje_6 from "./Cargar_viaje_6";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const PROXIMA_PANTALLA = 0;
const PANTALLA_ANTERIOR = 1;
const CARGAR_LISTA_CAMION = 2;
const CARGAR_LISTA_SEMIRREMOLQUE = 3;
const CARGAR_LISTA_CHOFER = 4;
const SELECCIONAR_VEHICULO = 5;
const SELECCIONAR_DESTINO = 6;
const SELECCIONAR_KILOMETROS_REALIZADOS = 7;
const SELECCIONAR_COSTO_COMBUSTIBLE = 8;
const SELECCIONAR_FECHA_PARTIDA = 9;
const SELECCIONAR_FECHA_LLEGADA = 10;
const SELECCIONAR_FECHA_ESPERADA = 11;
const SELECCIONAR_PESO = 12;
const SELECCIONAR_SEMIRREMOLQUE = 13;
const SELECCIONAR_CHOFER = 14;
const RESETEAR_CUERPO_VIAJE = 15;
const CARGAR_FILTROS = 16;

const estadoInicial = {
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

const reducer = (estado, accion) => {
  switch (accion.type) {
    case PROXIMA_PANTALLA: {
      return accion.payload.includes(false)
        ? estado
        : { ...estado, pantalla: estado.pantalla + 1 };
    }
    case PANTALLA_ANTERIOR: {
      return { ...estado, pantalla: estado.pantalla - 1 };
    }
    case CARGAR_LISTA_CAMION: {
      return { ...estado, lista_camiones: accion.payload };
    }
    case CARGAR_LISTA_CHOFER: {
      return { ...estado, lista_choferes: accion.payload };
    }
    case CARGAR_LISTA_SEMIRREMOLQUE: {
      return { ...estado, lista_semirremolques: accion.payload };
    }
    case SELECCIONAR_VEHICULO: {
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
    case SELECCIONAR_DESTINO: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          destino: accion.payload,
        },
      };
    }
    case SELECCIONAR_KILOMETROS_REALIZADOS: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          kilometros_realizados: accion.payload,
        },
      };
    }
    case SELECCIONAR_COSTO_COMBUSTIBLE: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          costos_combustibles: accion.payload,
        },
      };
    }
    case CARGAR_FILTROS: {
      return {
        ...estado,
        filtros: accion.payload,
      };
    }
    case SELECCIONAR_FECHA_PARTIDA: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          fecha_partida: accion.payload,
        },
      };
    }
    case SELECCIONAR_FECHA_LLEGADA: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          fecha_llegada: accion.payload,
        },
      };
    }
    case SELECCIONAR_FECHA_ESPERADA: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          fecha_esperada: accion.payload,
        },
      };
    }
    case SELECCIONAR_PESO: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          peso: accion.payload,
        },
      };
    }
    case SELECCIONAR_CHOFER: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          chofer: accion.payload,
        },
      };
    }
    case SELECCIONAR_SEMIRREMOLQUE: {
      return {
        ...estado,
        cuerpo_cargar_viaje: {
          ...estado.cuerpo_cargar_viaje,
          semirremolque: accion.payload,
        },
      };
    }
    case RESETEAR_CUERPO_VIAJE:
      return estadoInicial;

    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};

export const Cargar_viaje = () => {
  const [estado, dispatch] = useReducer(reducer, estadoInicial);
  const navegar = useNavigate();

  const enviarFormulario = () => {
    axios
      .post("http://localhost:8080/viajes", estado.cuerpo_cargar_viaje, {
        headers: { "content-type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: RESETEAR_CUERPO_VIAJE });
        navegar("/viajes");
      });
  };
  // //HAY QUE TENER ALGUNA PANTALLA PARA CUANDO NO HAYA CAMIONES Y/O SEMIRREMOLQUES EN EL PERIODO DETERMINADO
  // // if (estado.lista_vehiculos.length < 1) {
  // //   return <p>No hay camiones cargados</p>;
  // // }
  useEffect(() => {
    dispatch({ type: RESETEAR_CUERPO_VIAJE });
  }, []);
  return (
    <>
      {estado.pantalla == 0 && (
        <Cargar_viaje_1
          dispatch={dispatch}
          acciones={{
            PROXIMA_PANTALLA,
            SELECCIONAR_FECHA_PARTIDA,
            SELECCIONAR_FECHA_LLEGADA,
            SELECCIONAR_FECHA_ESPERADA,
          }}
          estado={estado}
        />
      )}
      {estado.pantalla == 1 && (
        <Cargar_viaje_2
          estado={estado}
          dispatch={dispatch}
          acciones={{
            PANTALLA_ANTERIOR,
            PROXIMA_PANTALLA,
            CARGAR_FILTROS,
            SELECCIONAR_VEHICULO,
            SELECCIONAR_DESTINO,
            SELECCIONAR_KILOMETROS_REALIZADOS,
            SELECCIONAR_COSTO_COMBUSTIBLE,
            CARGAR_LISTA_CAMION,
            CARGAR_LISTA_CHOFER,
            CARGAR_LISTA_SEMIRREMOLQUE,
          }}
        />
      )}
      {estado.pantalla == 2 && (
        <Cargar_viaje_3
          estado={estado}
          dispatch={dispatch}
          acciones={{
            SELECCIONAR_SEMIRREMOLQUE,
            PROXIMA_PANTALLA,
            PANTALLA_ANTERIOR,
            CARGAR_LISTA_SEMIRREMOLQUE,
          }}
        />
      )}
      {estado.pantalla == 3 && (
        <Cargar_viaje_4
          estado={estado}
          dispatch={dispatch}
          acciones={{
            PROXIMA_PANTALLA,
            PANTALLA_ANTERIOR,
            CARGAR_LISTA_CHOFER,
            SELECCIONAR_CHOFER,
          }}
        />
      )}
      {estado.pantalla == 4 && (
        <Cargar_viaje_5
          estado={estado}
          dispatch={dispatch}
          acciones={{
            PROXIMA_PANTALLA,
            PANTALLA_ANTERIOR,
            SELECCIONAR_DESTINO,
            SELECCIONAR_KILOMETROS_REALIZADOS,
            SELECCIONAR_COSTO_COMBUSTIBLE,
            SELECCIONAR_PESO,
          }}
        />
      )}
      {estado.pantalla == 5 && (
        <Cargar_viaje_6
          estado={estado}
          dispatch={dispatch}
          acciones={{ PANTALLA_ANTERIOR }}
          enviarFormulario={enviarFormulario}
        />
      )}
    </>
  );
};
