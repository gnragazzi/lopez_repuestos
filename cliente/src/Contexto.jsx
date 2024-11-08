import { useState, useContext, createContext, useReducer } from "react";
import {
  estadoInicial_camiones,
  reducer_camiones,
  acciones_camiones,
} from "./utilidades/reducer_camiones";
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
        auth,
        setAuth,
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
