import { useEffect, useReducer } from "react";
import Cargar_viaje_1 from "./Cargar_viaje_1";
import Cargar_viaje_2 from "./Cargar_viaje_2";
import Cargar_viaje_3 from "./Cargar_viaje_3";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PROXIMA_PANTALLA = 0;
const PANTALLA_ANTERIOR = 1;
const CARGAR_LISTA_VEHICULOS = 2;
const SELECCIONAR_VEHICULO = 3;
const SELECCIONAR_DESTINO = 4;
const SELECCIONAR_KILOMETROS_REALIZADOS = 5;
const SELECCIONAR_COSTO_COMBUSTIBLE = 6;
const SELECCIONAR_FECHA_PARTIDA = 7;
const SELECCIONAR_FECHA_LLEGADA = 8;
const SELECCIONAR_FECHA_ESPERADA = 9;
const RESETEAR_CUERPO_VIAJE = 10;
const estadoInicial = {
  cuerpo_cargar_viaje: {
    fecha_partida: new Date().toISOString().substring(0, 10),
    fecha_llegada: new Date().toISOString().substring(0, 10),
    fecha_esperada: new Date().toISOString().substring(0, 10),
    kilometros_realizados: 0,
    costos_combustibles: 0,
    destinos: "",
    camion: "",
  },
  lista_vehiculos: [],
  pantalla: 0,
};

const reducer = (estado, accion) => {
  switch (accion.type) {
    case PROXIMA_PANTALLA: {
      console.log(accion.payload);
      return accion.payload.includes(false)
        ? estado
        : { ...estado, pantalla: estado.pantalla + 1 };
    }
    case PANTALLA_ANTERIOR: {
      return { ...estado, pantalla: estado.pantalla - 1 };
    }
    case CARGAR_LISTA_VEHICULOS: {
      return { ...estado, lista_vehiculos: accion.payload };
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
          destinos: accion.payload,
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
    console.log("Hola Ahí");
    axios
      .post("http://localhost:8080/cargar_viaje", estado.cuerpo_cargar_viaje, {
        headers: { "content-type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: RESETEAR_CUERPO_VIAJE });
        navegar("/viajes");
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/vehiculos?tipo=camion", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: CARGAR_LISTA_VEHICULOS, payload: res.data });
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {estado.lista_vehiculos.length < 1 && <p>No hay camiones cargados</p>}
      {estado.pantalla == 0 && (
        <Cargar_viaje_1
          estado={estado}
          dispatch={dispatch}
          acciones={{
            PROXIMA_PANTALLA,
            SELECCIONAR_VEHICULO,
            SELECCIONAR_DESTINO,
            SELECCIONAR_KILOMETROS_REALIZADOS,
            SELECCIONAR_COSTO_COMBUSTIBLE,
          }}
        />
      )}
      {estado.pantalla == 1 && (
        <Cargar_viaje_2
          dispatch={dispatch}
          acciones={{
            PROXIMA_PANTALLA,
            PANTALLA_ANTERIOR,
            SELECCIONAR_FECHA_PARTIDA,
            SELECCIONAR_FECHA_LLEGADA,
            SELECCIONAR_FECHA_ESPERADA,
          }}
          estado={estado}
        />
      )}
      {estado.pantalla == 2 && (
        <Cargar_viaje_3
          cuerpo={estado.cuerpo_cargar_viaje}
          lista_vehiculos={estado.lista_vehiculos}
          dispatch={dispatch}
          acciones={{ PANTALLA_ANTERIOR }}
          enviarFormulario={enviarFormulario}
        />
      )}
    </>
  );
};
