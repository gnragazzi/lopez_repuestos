import { useEffect, useReducer } from "react";
import Cargar_viaje_1 from "./Cargar_viaje_1";
import Cargar_viaje_2 from "./Cargar_viaje_2";
import Cargar_viaje_3 from "./Cargar_viaje_3";
import Cargar_viaje_4 from "./Cargar_viaje_4";
import Cargar_viaje_5 from "./Cargar_viaje_5";
import Cargar_viaje_6 from "./Cargar_viaje_6";
import {
  acciones_cargar_viaje as acciones,
  estadoInicial_cargar_viaje as estadoInicial,
  reducer_cargar_viaje as reducer,
} from "../../utilidades/reducer_cargar_viaje";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

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
        dispatch({ type: acciones.RESETEAR_CUERPO_VIAJE });
        toast.success("🚚 Viaje Cargado Correctamente 🚚", {
          position: "top-center",
          autoClose: 3000,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          icon: false,
          bodyClassName: "toast_class",
        });
        navegar("/viajes");
      });
  };
  // //HAY QUE TENER ALGUNA PANTALLA PARA CUANDO NO HAYA CAMIONES Y/O SEMIRREMOLQUES EN EL PERIODO DETERMINADO
  // // if (estado.lista_vehiculos.length < 1) {
  // //   return <p>No hay camiones cargados</p>;
  // // }
  useEffect(() => {
    dispatch({ type: acciones.RESETEAR_CUERPO_VIAJE });
  }, []);
  return (
    <>
      {estado.pantalla == 0 && (
        <Cargar_viaje_1
          dispatch={dispatch}
          acciones={acciones}
          estado={estado}
        />
      )}
      {estado.pantalla == 1 && (
        <Cargar_viaje_2
          estado={estado}
          dispatch={dispatch}
          acciones={acciones}
        />
      )}
      {estado.pantalla == 2 && (
        <Cargar_viaje_3
          estado={estado}
          dispatch={dispatch}
          acciones={acciones}
        />
      )}
      {estado.pantalla == 3 && (
        <Cargar_viaje_4
          estado={estado}
          dispatch={dispatch}
          acciones={acciones}
        />
      )}
      {estado.pantalla == 4 && (
        <Cargar_viaje_5
          estado={estado}
          dispatch={dispatch}
          acciones={acciones}
        />
      )}
      {estado.pantalla == 5 && (
        <Cargar_viaje_6
          estado={estado}
          dispatch={dispatch}
          acciones={acciones}
          enviarFormulario={enviarFormulario}
        />
      )}
    </>
  );
};
