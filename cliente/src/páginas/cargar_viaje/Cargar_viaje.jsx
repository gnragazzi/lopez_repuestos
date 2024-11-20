import { useEffect, useReducer, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";
import { Bounce, toast } from "react-toastify";

export const Cargar_viaje = () => {
  const axiosPrivado = useAxiosPrivado();
  const [error, setError] = useState("");
  const [estado, dispatch] = useReducer(reducer, estadoInicial);
  const navegar = useNavigate();

  const enviarFormulario = () => {
    setError("");
    axiosPrivado
      .post("/viajes", estado.cuerpo_cargar_viaje)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        setError(error.message);
      });
    axiosPrivado
      .patch("/vehiculos", {
        patente: estado.cuerpo_cargar_viaje.camion,
        km_realizados: estado.cuerpo_cargar_viaje.kilometros_realizados,
      })
      .then(() => {
        dispatch({ type: acciones.RESETEAR_CUERPO_VIAJE });
        toast.success("🚚 Viaje Cargado Correctamente 🚚", {
          position: "top-center",
          autoClose: 2000,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          icon: false,
          closeButton: false,
          style: { textAlign: "center" },
          pauseOnHover: false,
          bodyClassName: "toast_class",
        });
        navegar("/viajes");
      })
      .catch((err) => setError(err.message));
  };
  // //HAY QUE TENER ALGUNA PANTALLA PARA CUANDO NO HAYA CAMIONES Y/O SEMIRREMOLQUES EN EL PERIODO DETERMINADO
  // // if (estado.lista_vehiculos.length < 1) {
  // //   return <p>No hay camiones cargados</p>;
  // // }
  useEffect(() => {
    dispatch({ type: acciones.RESETEAR_CUERPO_VIAJE });
  }, []);
  if (error) {
    return (
      <>
        <h1>{error}</h1>
      </>
    );
  } else
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
