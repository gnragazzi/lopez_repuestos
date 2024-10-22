import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useContextoGlobal } from "../Contexto";

function Camiones() {
  const {
    auth,
    estado_camiones: estado,
    dispatch_camiones: dispatch,
    acciones_camiones: acciones,
  } = useContextoGlobal();

  const { RESETEAR_ESTADO, CARGAR_LISTA_CAMIONES, SELECCIONAR_CAMION } =
    acciones;

  useEffect(() => {
    dispatch({ type: RESETEAR_ESTADO });
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/vehiculos?tipo=camion",
          { headers: { Authorization: `Bearer ${auth}` } }
        );
        const camionesData = Array.isArray(response.data) ? response.data : [];

        dispatch({ type: CARGAR_LISTA_CAMIONES, payload: camionesData });
      } catch (error) {
        console.error("Error al traer los datos:", error);
        dispatch({ type: CARGAR_LISTA_CAMIONES, payload: [] });
      }
    };

    fetchData();
  }, [CARGAR_LISTA_CAMIONES, dispatch, RESETEAR_ESTADO]);

  return (
    <div className="App">
      <Outlet />
      <h2>Camiones</h2>
      <br />
      <Link rel="nofollow" to="nuevo" className="enlace_cargar_mantenimiento">
        <button className="btn btn-success">Insertar</button>
      </Link>
      <div className="container__table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Patente</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Kilometraje</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {estado.lista_camiones.length === 0 ? (
              <tr>
                <td colSpan="5">No hay datos disponibles</td>
              </tr>
            ) : (
              estado.lista_camiones.map((elemento) => {
                return (
                  <tr key={elemento.patente}>
                    <td>{elemento.patente}</td>
                    <td>{elemento.marca}</td>
                    <td>{elemento.modelo}</td>
                    <td>{elemento.kilometraje}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => console.log("Editar:", elemento)}
                      >
                        Editar
                      </button>{" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => console.log("Eliminar:", elemento)}
                      >
                        Eliminar
                      </button>{" "}
                      <Link
                        rel="nofollow"
                        to={"costos"}
                        className="btn btn-primary"
                        onClick={() =>
                          dispatch({
                            type: SELECCIONAR_CAMION,
                            payload: elemento.patente,
                          })
                        }
                      >
                        Costos
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Camiones;
