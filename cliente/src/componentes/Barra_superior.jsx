import { useState } from "react";
import icono_lopez from "../assets/iconos_lopez/icono_empresa.png";
import { IoSettingsSharp } from "react-icons/io5";
import { MdContactSupport } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import axios from "axios";
import { useContextoGlobal } from "../Contexto";
import { useNavigate } from "react-router-dom";

function Barra_superior() {
  const navegar = useNavigate();
  const {
    setAuth,
    estado_vencimiento: { numeroNotificaciones },
  } = useContextoGlobal();
  const [x, setX] = useState(0);
  const [menuOculto, setMenuOculto] = useState(true);
  const [overlayOculto, setOverlayOculto] = useState(true);
  const [menuActual, setMenuActual] = useState("");
  const [texto, setTexto] = useState("");
  const [funcionMenu, setFuncionMenu] = useState();

  const logout = () => {
    setAuth("");
    axios.get("http://localhost:8080/clear").then((res) => console.log(res));
  };

  const modificarAltura = (e) => {
    const id = e.currentTarget.id;
    if (menuOculto || menuActual !== id) {
      const { x, width } = e.target.getBoundingClientRect();
      setX(x + width / 2);
      setMenuOculto(false);
      setOverlayOculto(false);
      setMenuActual(id);
      switch (id) {
        case "config":
          {
            setTexto("Configuración");
            setFuncionMenu(() => {});
          }
          break;
        case "ayuda":
          {
            setTexto("Ayuda");
            setFuncionMenu(() => {});
          }
          break;
        case "usuario":
          {
            setTexto("Logout");
            setFuncionMenu(() => logout);
          }
          break;
        case "notificaciones":
          {
            setMenuOculto(true);
            setOverlayOculto(true);
            navegar("/principal");
          }
          break;
        default:
          setTexto("Error");
          setFuncionMenu(() => {});
      }
    } else {
      setMenuOculto(true);
      setOverlayOculto(true);
    }
  };

  return (
    <div className="header__barra_superior">
      <div className="barra_superior__icono_superior">
        <img src={icono_lopez} alt="Icono de la empresa" />
      </div>
      <div className="nav__barra_superior">
        <a className="iconos_barra_superior" to="#">
          <IoMdContact
            id="usuario"
            className="icon"
            onClick={modificarAltura}
          />
        </a>
        <div
          className="iconos_barra_superior"
          id="notificaciones"
          onClick={modificarAltura}
        >
          <IoIosNotifications id="notificaciones" className="icon" />
          {numeroNotificaciones > 0 && (
            <div
              className={
                numeroNotificaciones ? "notificaciones_barra_superior" : ""
              }
            ></div>
          )}
        </div>
        <a className="iconos_barra_superior" to="#">
          {" "}
          <IoSettingsSharp
            id="config"
            className="icon"
            onClick={modificarAltura}
          />
        </a>
        <a className="iconos_barra_superior" to="#">
          <MdContactSupport
            id="ayuda"
            className="icon ayuda"
            
          />
        </a>
      </div>
      <div
        className={overlayOculto ? "overlay overlay_oculto" : "overlay"}
        onClick={() => {
          setMenuOculto(true);
          setOverlayOculto(true);
        }}
      >
        <div
          className={
            menuOculto
              ? "menu_barra_superior menu_oculto"
              : "menu_barra_superior"
          }
          style={{ left: `${x}px` }}
          onClick={funcionMenu}
        >
          <h2 className="item_menu_barra_superior">{texto}</h2>
        </div>
      </div>
    </div>
  );
}

export default Barra_superior;
