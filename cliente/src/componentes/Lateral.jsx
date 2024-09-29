import { categorias } from "../assets/data";
import { useContextoGlobal } from "../Contexto";
import { Link } from "react-router-dom";
import arrow from "../assets/iconos_lateral/arrow.svg";
import icono_lopez from "../assets/iconos_lopez/icono_lopez.png";

function Lateral() {
  const { clickMenu, menuSeleccionado } = useContextoGlobal();
  return (
    <div className="lateral">
      <div className="icono_lopez_lateral">
        <img src={icono_lopez} />
      </div>
      <ul>
        {categorias.map(({ nombre, subcategorias, img }) => {
          return subcategorias ? (
            <div key={nombre}> 
                <li
                  className={
                    menuSeleccionado == nombre ? "seleccion" : "no_seleccion"
                  }
                  onClick={clickMenu}
                >
                  <img className="icono_lateral" src={img} />
                  <p>{nombre}</p>
                  
                  <img
                  className={menuSeleccionado == nombre ? "arrow open" : "arrow"}
                  src={arrow}/>

                </li>
              {subcategorias.map((sub) => {
                return (
                    <li
                      key={sub}
                      className={
                        menuSeleccionado == nombre ? "seleccion_visible": "oculto"
                      }
                      onClick={()=> console.log("jasjasj")}
                    >
                      <a to={`/${nombre}`}><p>{sub}</p></a>
                    </li>
                );
              })}
            </div>
          ) : (
            <Link to={`/${nombre}`}>
              <li
                key={nombre}
                className={
                  menuSeleccionado == nombre ? "seleccion" : "no_seleccion"
                }
                onClick={clickMenu}
              >
                <img src={img} />
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
