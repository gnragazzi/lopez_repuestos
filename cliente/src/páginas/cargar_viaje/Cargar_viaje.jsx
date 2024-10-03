import { useReducer } from "react";
import Cargar_viaje_1 from "./Cargar_viaje_1";
import Cargar_viaje_2 from "./Cargar_viaje_2";
import Cargar_viaje_3 from "./Cargar_viaje_3";

const PROXIMA_PANTALLA = 0;
const PANTALLA_ANTERIOR = 1;

const estadoInicial = {
  cuerpo: {
    fecha_partida: null,
    fecha_llegada: null,
    fecha_esperada: null,
    kilometros_realizados: 0,
    costos_combustibles: 0,
    destinos: "",
    camion: "",
  },
  pantalla: 0,
};

const reducer = (estado, accion) => {
  switch (accion.type) {
    case PROXIMA_PANTALLA: {
      return { ...estado, pantalla: estado.pantalla + 1 };
    }
    case PANTALLA_ANTERIOR: {
      return { ...estado, pantalla: estado.pantalla - 1 };
    }
    default:
      throw new Error(`ERROR: "${accion.type}" no es una acción reconocida...`);
  }
};

export const Cargar_viaje = () => {
  const [estado, dispatch] = useReducer(reducer, estadoInicial);
  /*
    Página de confirmación
*/
  return (
    <>
      {estado.pantalla == 0 && (
        <Cargar_viaje_1 dispatch={dispatch} acciones={{ PROXIMA_PANTALLA }} />
      )}
      {estado.pantalla == 1 && (
        <Cargar_viaje_2
          dispatch={dispatch}
          acciones={{ PROXIMA_PANTALLA, PANTALLA_ANTERIOR }}
        />
      )}
      {estado.pantalla == 2 && (
        <Cargar_viaje_3 dispatch={dispatch} acciones={{ PANTALLA_ANTERIOR }} />
      )}
    </>
  );
};
