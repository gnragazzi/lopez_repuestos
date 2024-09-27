import { categorias } from "../assets/data";
import { useContextoGlobal } from "../Contexto";
import { Link } from "react-router-dom";

function Lateral() {
  const { clickMenu, menuSeleccionado } = useContextoGlobal();

  return (
    <div className="lateral">
      <ul>
        {categorias.map(({ nombre, subcategorias }) => {
          return subcategorias ? (
            <div key={nombre}>
              <li
                className={
                  menuSeleccionado == nombre ? "seleccion" : "no_seleccion"
                }
                onClick={clickMenu}
              >
                <p>{nombre}</p>
              </li>
              {subcategorias.map((sub) => {
                return (
                  <li
                    key={sub}
                    className={
                      menuSeleccionado == nombre
                        ? "seleccion visible"
                        : " oculto"
                    }
                    onClick={clickMenu}
                  >
                    <p>{sub}</p>
                  </li>
                );
              })}
            </div>
          ) : (
            <li
              key={nombre}
              className={
                menuSeleccionado == nombre ? "seleccion" : "no_seleccion"
              }
              onClick={clickMenu}
            >
              <Link to={`/${nombre}`}>{nombre}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Lateral;
