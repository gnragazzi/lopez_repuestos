import { useState, useContext, createContext, useReducer } from "react";
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
const ContextoGlobal = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useContextoGlobal = () => {
  return useContext(ContextoGlobal);
};

// eslint-disable-next-line react/prop-types
function Contexto({ children }) {
  const [auth, setAuth] = useState("");
  const [estado_camiones, dispatch_camiones] = useReducer(
    reducer_camiones,
    estadoInicial_camiones
  );
  const [estado_semirremolques, dispatch_semirremolques] = useReducer(
    reducer_semirremolques,
    estadoInicial_semirremolques,
  )
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
        auth,
        setAuth,
        estado_semirremolques,
        dispatch_semirremolques,
        acciones_semirremolques,
      }}
    >
      {children}
    </ContextoGlobal.Provider>
  );
}

export default Contexto;
