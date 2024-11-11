import { useState, useContext, createContext, useReducer } from "react";
import {
  estadoInicial_tecnica,
  reducer_tecnica,
  acciones_tecnica,
} from "./utilidades/reducer_tecnica";
import {
  estadoInicial_camiones,
  reducer_camiones,
  acciones_camiones,
} from "./utilidades/reducer_camiones";

import {
  estadoInicial_semirremolques,
  reducer_semirremolques,
  acciones_semirremolques,
} from "./utilidades/reducer_semirremolques";

import{
  estadoInicial_seguro,
  reducer_seguro,
  acciones_seguro,
} from "./utilidades/reducer_seguros"


import {
  acciones_choferes,
  estadoInicial_choferes,
  reducer_choferes,
} from "./utilidades/reducer_choferes";

const ContextoGlobal = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useContextoGlobal = () => {
  return useContext(ContextoGlobal);
};

// eslint-disable-next-line react/prop-types
function Contexto({ children }) {
  const [estadoModal, setEstadoModal] = useState({
    activo: false,
    mensaje: "",
    accion: () => {},
  });
  const [auth, setAuth] = useState("");
  const [estado_camiones, dispatch_camiones] = useReducer(
    reducer_camiones,
    estadoInicial_camiones
  );

  const [estado_semirremolques, dispatch_semirremolques] = useReducer(
    reducer_semirremolques,
    estadoInicial_semirremolques,
  )

  const [estado_tecnica, dispatch_tecnica] = useReducer(
    reducer_tecnica,
    estadoInicial_tecnica
  )

  const [estado_seguro, dispatch_seguro] = useReducer(
    reducer_seguro,
    estadoInicial_seguro
  );

  
  const [estado_choferes, dispatch_choferes] = useReducer(
    reducer_choferes,
    estadoInicial_choferes
  );
  const [menuSeleccionado, setMenuSeleccionado] = useState("");
  const clickMenu = (e) => {
    setMenuSeleccionado(e.currentTarget.textContent);
  };

  return (
    <ContextoGlobal.Provider
      value={{
        useContextoGlobal,
        menuSeleccionado,
        clickMenu,
        estado_camiones,
        dispatch_camiones,
        acciones_camiones,
        estado_seguro,
        dispatch_seguro,
        acciones_seguro,
        auth,
        setAuth,
        estado_semirremolques,
        dispatch_semirremolques,
        acciones_semirremolques,
        estado_tecnica,
        dispatch_tecnica,
        acciones_tecnica,
        estado_choferes,
        dispatch_choferes,
        acciones_choferes,
        estadoModal,
        setEstadoModal,
      }}
    >
      {children}
    </ContextoGlobal.Provider>
  );
}

export default Contexto;

