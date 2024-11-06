import { useState, useContext, createContext, useReducer } from "react";
import {
  estadoInicial_camiones,
  reducer_camiones,
  acciones_camiones,
} from "./utilidades/reducer_camiones";
import {
  estadoInicial_seguro,
  reducer_seguro,
  acciones_seguro,
} from "./utilidades/reducer_seguros"
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
  const [estado_seguro, dispatch_seguro] = useReducer(
    reducer_seguro,
    estadoInicial_seguro
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
      }}
    >
      {children}
    </ContextoGlobal.Provider>
  );
}

export default Contexto;
