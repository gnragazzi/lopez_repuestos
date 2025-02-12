import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useContextoGlobal } from "../Contexto";
import useAxiosPrivado from "../utilidades/useAxiosPrivado";

function Semirremolques() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const {
    estado_semirremolques: estado,
    dispatch_semirremolques: dispatch,
    acciones_semirremolques: acciones,
    dispatch_tecnica: dispatch_tecnica,
    acciones_tecnica: acciones_tecnica,
    dispatch_seguro: dispatch_seguro,
    acciones_seguro: acciones_seguro,
  } = useContextoGlobal();

  const axiosPrivado = useAxiosPrivado();

  const { RESETEAR_ESTADO, CARGAR_LISTA_SEMIRREMOLQUES } = acciones;

  const { SELECCIONAR_VEHICULO:SELECCIONAR_VEHICULO_TECNICA, RESETEAR_ESTADO:RESETEAR_ESTADO_TECNICA , ES_CAMION_TECNICA} = acciones_tecnica;
  const { SELECCIONAR_VEHICULO:SELECCIONAR_VEHICULO_SEGURO, RESETEAR_ESTADO:RESETEAR_ESTADO_SEGURO , ES_CAMION_SEGURO} = acciones_seguro;

  useEffect(() => {
    dispatch({ type: RESETEAR_ESTADO });
    setError("");
    setCargando(true);
    const fetchData = async () => {
      try {
        const response = await axiosPrivado.get(
          "/vehiculos?tipo=semirremolque"
        );
        const semirremolquesData = Array.isArray(response.data)
          ? response.data
          : [];

        dispatch({
          type: CARGAR_LISTA_SEMIRREMOLQUES,
          payload: semirremolquesData,
        });
        setCargando(false);
      } catch (error) {
        dispatch({ type: CARGAR_LISTA_SEMIRREMOLQUES, payload: [] });
        setError(error.message);
        setCargando(false);
      }
    };

    fetchData();
  }, [CARGAR_LISTA_SEMIRREMOLQUES, dispatch, RESETEAR_ESTADO, axiosPrivado]);

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
        <h2>Semirremolques</h2>
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
                <th>Tipo</th>
                <th>Carga</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {estado.lista_semirremolques.length === 0 ? (
                <tr>
                  <td colSpan="5">No hay datos disponibles</td>
                </tr>
              ) : (
                estado.lista_semirremolques.map((elemento) => {
                  return (
                    <tr key={elemento.patente}>
                      <td>{elemento.patente}</td>
                      <td>{elemento.marca}</td>
                      <td>{elemento.tipo}</td>
                      <td>{elemento.carga}</td>
                      <td className="acciones">
                        <Link
                          rel="nofollow"
                          to={"seguro"}
                          className="btn btn-info"
                          onClick={() =>{
                            dispatch_seguro({type: RESETEAR_ESTADO_SEGURO});
                            dispatch_seguro({
                              type: SELECCIONAR_VEHICULO_SEGURO,
                              payload: elemento.patente,
                            })
                            dispatch_seguro({
                              type: ES_CAMION_SEGURO,
                              payload: "semirremolque"
                            })
                          }}
                        >
                          Seguro
                        </Link>
                        <Link
                          rel="nofollow"
                          to={"tecnica"}
                          className="btn btn-primary"
                          onClick={() =>{
                            dispatch_tecnica({type: RESETEAR_ESTADO_TECNICA});
                            dispatch_tecnica({
                              type: SELECCIONAR_VEHICULO_TECNICA,
                              payload: elemento.patente,
                            })
                            dispatch_tecnica({
                              type: ES_CAMION_TECNICA,
                              payload: "semirremolque"
                            })
                          }}
                        >
                          Técnica
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

export default Semirremolques;