import icono_principal from "../assets/iconos_lateral/icono_principal.svg"
import icono_viaje from "../assets/iconos_lateral/icono_viaje.svg"
import icono_empleado from "../assets/iconos_lateral/icono_empleado.svg"
import icono_vehiculos from "../assets/iconos_lateral/icono_vehiculos.svg"
import icono_mantenimiento from "../assets/iconos_lateral/icono_mantenimiento.svg"

export const categorias = [
    {
      nombre: "principal",
      img: icono_principal,
      subcategorias: null
    },
    {
      nombre: "viajes",
      img: icono_viaje,
      subcategorias: null
    },
    {
      nombre: "empleados",
      img: icono_empleado,
      subcategorias: ["choferes","mecánicos"]
    },
    {
      nombre: "vehículos",
      img: icono_vehiculos,
      subcategorias: ["camiones","semi-remolques"]
    },
    {
      nombre: "mantenimiento",
      img: icono_mantenimiento,
      subcategorias: null
    },
  ]

