import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContextoGlobal } from "../Contexto";
import useAxiosPrivado from "../utilidades/useAxiosPrivado";

function Camiones() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const {
    estado_camiones: estado,
    dispatch_camiones: dispatch,
    acciones_camiones: acciones,
    dispatch_tecnica: dispatch_tecnica,
    acciones_tecnica: acciones_tecnica,
    dispatch_seguro: dispatch_seguro,
    acciones_seguro: acciones_seguro,
  } = useContextoGlobal();

  const axiosPrivado = useAxiosPrivado();

  const { RESETEAR_ESTADO, CARGAR_LISTA_CAMIONES, SELECCIONAR_CAMION } =
    acciones;

  const {
    SELECCIONAR_VEHICULO: SELECCIONAR_VEHICULO_TECNICA,
    RESETEAR_ESTADO: RESETEAR_ESTADO_TECNICA,
    ES_CAMION_TECNICA,
  } = acciones_tecnica;
  const {
    SELECCIONAR_VEHICULO: SELECCIONAR_VEHICULO_SEGURO,
    RESETEAR_ESTADO: RESETEAR_ESTADO_SEGURO,
    ES_CAMION_SEGURO,
  } = acciones_seguro;

  useEffect(() => {
    dispatch({ type: RESETEAR_ESTADO });
    setError("");
    setCargando(true);
    const fetchData = async () => {
      try {
        const response = await axiosPrivado.get("/vehiculos?tipo=camion");
        const camionesData = Array.isArray(response.data) ? response.data : [];

        dispatch({ type: CARGAR_LISTA_CAMIONES, payload: camionesData });
        setCargando(false);
      } catch (error) {
        dispatch({ type: CARGAR_LISTA_CAMIONES, payload: [] });
        setError(error.message);
        setCargando(false);
      }
    };

    fetchData();
  }, [CARGAR_LISTA_CAMIONES, dispatch, RESETEAR_ESTADO, axiosPrivado]);

  if (cargando) {
    return <h1>Cargando...</h1>;
  } else if (error) {
    return (
      <>
        <h1>{error}</h1>
      </>
    );
  } else
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
                      <td className="acciones">
                        <Link
                          rel="nofollow"
                          to={"seguro"}
                          className="btn btn-info"
                          onClick={() => {
                            dispatch_seguro({ type: RESETEAR_ESTADO_SEGURO });
                            dispatch_seguro({
                              type: SELECCIONAR_VEHICULO_SEGURO,
                              payload: elemento.patente,
                            });
                            dispatch_seguro({
                              type: ES_CAMION_SEGURO,
                              payload: "camion",
                            });
                          }}
                        >
                          Seguro
                        </Link>
                        <Link
                          rel="nofollow"
                          to={"tecnica"}
                          className="btn btn-primary"
                          onClick={() => {
                            dispatch_tecnica({ type: RESETEAR_ESTADO_TECNICA });
                            dispatch_tecnica({
                              type: SELECCIONAR_VEHICULO_TECNICA,
                              payload: elemento.patente,
                            });
                            dispatch_tecnica({
                              type: ES_CAMION_TECNICA,
                              payload: "camion",
                            });
                          }}
                        >
                          Tecnica
                        </Link>
                        <Link
                          rel="nofollow"
                          to={"costos"}
                          className="btn btn-warning"
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
