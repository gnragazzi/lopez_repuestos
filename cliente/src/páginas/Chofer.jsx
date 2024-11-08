import { useEffect } from "react";
import { acciones_choferes as acciones } from "../utilidades/reducer_choferes";
import useAxiosPrivado from "../utilidades/useAxiosPrivado";
import { Link, Outlet } from "react-router-dom";
import { useContextoGlobal } from "../Contexto";
import { toast } from "react-toastify";

const Chofer = () => {
  const {
    estado_choferes: estado,
    dispatch_choferes: dispatch,
    setEstadoModal,
  } = useContextoGlobal();
  const axiosPrivado = useAxiosPrivado();
  const { CONSULTADO_SERVIDOR, ERROR_SERVIDOR, CARGAR_CHOFERES, BAJA_CHOFER } =
    acciones;

  // eslint-disable-next-line no-unused-vars
  const { choferes_activos, error, cargando } = estado;

  useEffect(() => {
    dispatch({ tipo: CONSULTADO_SERVIDOR });
    axiosPrivado
      .get("/empleados?tipo=chofer")
      .then((res) => {
        const inactivos = [];
        const activos = res.data.filter((ch) => {
          if (ch.activo) return true;
          else {
            inactivos.push(ch);
            return false;
          }
        });
        dispatch({ tipo: CARGAR_CHOFERES, payload: { activos, inactivos } });
      })
      .catch((err) => {
        dispatch({ tipo: { ERROR_SERVIDOR }, payload: err.message });
      });
  }, [
    CARGAR_CHOFERES,
    CONSULTADO_SERVIDOR,
    ERROR_SERVIDOR,
    axiosPrivado,
    dispatch,
  ]);

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
      <>
        <div className="App">
          <Outlet />
          <h2>Choferes</h2>
          <br />
          <Link
            rel="nofollow"
            to="nuevo"
            className="enlace_cargar_mantenimiento"
          >
            <button className="btn btn-success">Insertar</button>
          </Link>
          <div className="container__table">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>DNI</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Teléfono</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {choferes_activos.length === 0 ? (
                  <tr>
                    <td colSpan="5">No hay Choferes Cargados en el Sistema</td>
                  </tr>
                ) : (
                  choferes_activos.map((ch) => {
                    return (
                      <tr key={ch.dni}>
                        <td>{ch.dni}</td>
                        <td>{ch.nombre}</td>
                        <td>{ch.apellido}</td>
                        <td>{ch.telefono}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => console.log("Editar:", ch)}
                          >
                            Editar
                          </button>{" "}
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setEstadoModal({
                                activo: true,
                                mensaje: `¿Dar de baja a ${ch.nombre} ${ch.apellido}, DNI:${ch.dni}?`,
                                accion: () => {
                                  dispatch({
                                    tipo: BAJA_CHOFER,
                                    payload: ch.dni,
                                  });
                                  axiosPrivado
                                    .delete(
                                      `/empleados?tipo=chofer&id=${ch.dni}`
                                    )
                                    .then((res) => {
                                      toast.error(res.data, {
                                        position: "top-right",
                                        autoClose: 1500,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        icon: false,
                                        closeButton: false,
                                        bodyClassName: "toast_class",
                                        style: { textAlign: "center" },
                                        pauseOnHover: false,
                                        pauseOnFocusLoss: false,
                                      });
                                    })
                                    .catch((err) => {
                                      dispatch({
                                        tipo: ERROR_SERVIDOR,
                                        payload: err.message,
                                      });
                                    });
                                  setEstadoModal({
                                    activo: false,
                                    mensaje: "",
                                    accion: () => {},
                                  });
                                },
                              });
                            }}
                          >
                            Eliminar
                          </button>{" "}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
};

export default Chofer;
