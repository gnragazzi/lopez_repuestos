import icono_principal from "../assets/iconos_lateral/icono_principal.svg"
import icono_viaje from "../assets/iconos_lateral/icono_viaje.svg"
import icono_empleado from "../assets/iconos_lateral/icono_empleado.svg"
import icono_vehiculos from "../assets/iconos_lateral/icono_vehiculos.svg"
import icono_mantenimiento from "../assets/iconos_lateral/icono_mantenimiento.svg"
import { FaHome } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { FaTruck } from "react-icons/fa";
import { FaTools } from "react-icons/fa";



export const categorias = [
    {
      nombre: "principal",
      icono: <FaHome className="icono"/>,
      subcategorias: null
    },
    {
      nombre: "viajes",
      icono: <FaMapMarkedAlt className="icono" />,
      subcategorias: null
    },
    {
      nombre: "empleados",
      icono: <GrUserWorker className="icono"/>,
      subcategorias: ["choferes","mecánicos"]
    },
    {
      nombre: "vehículos",
      icono: <FaTruck className="icono"/>,
      subcategorias: ["camiones","semiRemolques"]
    },
    {
      nombre: "mantenimiento",
      icono: <FaTools className="icono"/>,
      subcategorias: null
    },
  ]

