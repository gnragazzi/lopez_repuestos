import { FaHome } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { FaTruck } from "react-icons/fa";
import { FaTools } from "react-icons/fa";

export const categorias = [
  {
    nombre: "principal",
    icono: <FaHome className="icono" />,
    subcategorias: null,
  },
  {
    nombre: "viajes",
    icono: <FaMapMarkedAlt className="icono" />,
    subcategorias: null,
  },
  {
    nombre: "empleados",
    icono: <GrUserWorker className="icono" />,
    subcategorias: ["choferes", "mecánicos"],
  },
  {
    nombre: "vehículos",
    icono: <FaTruck className="icono" />,
    subcategorias: ["camiones", "semirremolques"],
  },
  {
    nombre: "mantenimiento",
    icono: <FaTools className="icono" />,
    subcategorias: null,
  },
];
