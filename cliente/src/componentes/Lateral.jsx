import { categorias } from "../assets/data";
import { useContextoGlobal } from "../Contexto";
import { Link } from "react-router-dom";
import arrow from "../assets/iconos_lateral/arrow.svg";
import icono_lopez from "../assets/iconos_lopez/icono_empresa.png";
import { useState } from "react";

function Lateral() {
  const { clickMenu, menuSeleccionado } = useContextoGlobal();
  const [subMenuAbierto, setSubMenuAbierto] = useState(null);

  const toggleSubMenu = (nombre) => {
    setSubMenuAbierto(subMenuAbierto === nombre ? null : nombre);
  };

  return (
    <div className="lateral">
      <div className="icono_lopez_lateral">
        <img src={icono_lopez} alt="Icono de la empresa" />
      </div>
      <ul>
        {categorias.map(({ nombre, subcategorias, img }) => {
          return subcategorias ? (
            <div key={nombre}>
              <li
                className={menuSeleccionado === nombre ? "seleccion" : "no_seleccion"}
                onClick={() => {
                  clickMenu;
                  toggleSubMenu(nombre);
                }}
              >
                <img className="icono_lateral" src={img} alt={nombre} />
                <p>{nombre}</p>
                <img
                  className={subMenuAbierto === nombre ? "arrow open" : "arrow"}
                  src={arrow}
                  alt="Flecha"
                />
              </li>
              {subMenuAbierto === nombre && (
                subcategorias.map((sub) => (
                  <li
                    key={sub}
                    className="seleccion_visible"
                    onClick={() => console.log("Seleccionado:", sub)}
                  >
                    <Link to={`/${nombre}/${sub}`}>
                      <p>{sub}</p>
                    </Link>
                  </li>
                ))
              )}
            </div>
          ) : (
            <Link to={`/${nombre}`} key={nombre}>
              <li
                className={menuSeleccionado === nombre ? "seleccion" : "no_seleccion"}
                onClick={clickMenu}
              >
                <img className="icono_lateral" src={img} alt={nombre} />
                <p>{nombre}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Lateral;