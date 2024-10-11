import { categorias } from "../assets/data";
import { useContextoGlobal } from "../Contexto";
import { Link } from "react-router-dom";
import { useState, memo } from "react";
import { IoIosArrowForward } from "react-icons/io";

function Lateral() {
  const { clickMenu, menuSeleccionado } = useContextoGlobal();
  const [subMenuAbierto, setSubMenuAbierto] = useState(null);

  const toggleSubMenu = (nombre) => {
    setSubMenuAbierto(subMenuAbierto === nombre ? null : nombre);
  };

  return (
    <div className="div__lateral">
      <ul>
        {categorias.map(({ nombre, subcategorias, icono }) => {
          return subcategorias ? (
            <div key={nombre}>
              <li
                className={
                  menuSeleccionado == nombre ? "seleccion" : "no_seleccion"
                }
                onClick={() => {
                  clickMenu;
                  toggleSubMenu(nombre);
                }}
              >
                {icono}
                <p>{nombre}</p>
                <IoIosArrowForward
                  className={subMenuAbierto == nombre ? "arrow open" : "arrow"}
                />
              </li>

              {subMenuAbierto == nombre &&
                subcategorias.map((sub) => (
                  <li
                    key={sub}
                    className="seleccion_visible"
                    // onClick={() => handleSelect(sub)}
                  >
                    <Link to={`/${nombre}/${sub}`}>
                      <p>{sub}</p>
                    </Link>
                  </li>
                ))}
            </div>
          ) : (
            <Link to={`/${nombre}`} key={nombre}>
              <li
                className={
                  menuSeleccionado == nombre ? "seleccion" : "no_seleccion"
                }
                onClick={clickMenu}
              >
                {icono}
                <p>{nombre}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(Lateral);
