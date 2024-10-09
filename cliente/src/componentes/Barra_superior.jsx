import icono_lopez from "../assets/iconos_lopez/icono_empresa.png";
import { IoSettingsSharp } from "react-icons/io5";
import { MdContactSupport } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";



function Barra_superior() {
  return (
    <div className="header__barra_superior">
      <div className="barra_superior__icono_superior">
        <img src={icono_lopez} alt="Icono de la empresa" />
      </div>
      <div className="nav__barra_superior">
        <a className="iconos_barra_superior" to="#"> <IoSettingsSharp className="icon"/></a>
        <a className="iconos_barra_superior" to="#"><MdContactSupport className="icon"/></a>
        <a className="iconos_barra_superior" to="#"><IoMdContact className="icon"/></a>
        <a className="iconos_barra_superior" to="#"><IoIosNotifications className="icon"/></a>
      </div>

    </div>
  );
}

export default Barra_superior;
