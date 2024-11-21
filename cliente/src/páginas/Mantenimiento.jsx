import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContextoGlobal } from "../Contexto";
import useAxiosPrivado from "../utilidades/useAxiosPrivado";
import { notificacion_no_implementado } from "../utilidades/toast_modificados";

function Mantenimiento() {
  const navegar = useNavigate();
  const localizacion = useLocation();
  const [mantenimientos, setMantenimientos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const { auth, setAuth } = useContextoGlobal();
  const axiosPrivado = useAxiosPrivado();

  useEffect(() => {
    setError("");
    setCargando(true);
    axiosPrivado
      .get("/mantenimiento")
      .then((response) => {
        setCargando(false);
        setMantenimientos(response.data);
      })
      .catch((error) => {
        setCargando(false);

        setError(error.message);
        if (error.status == 401) {
          setAuth("");
          navegar("/login", { state: { from: localizacion }, replace: true });
        }
      });
  }, [auth, axiosPrivado, localizacion, navegar, setAuth]);

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
        <h2>Mantenimientos</h2>
        <br />
        <Link
          rel="nofollow"
          to="cargar_mantenimiento"
          className="enlace_cargar_mantenimiento"
        >
          <button className="btn btn-success">Insertar</button>
        </Link>
        <div className="container__table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Trabajos realizados</th>
                <th>Patente del vehiculo</th>
                <th>Marca</th>
                <th>Fecha</th>
                <th>Costo de mano de obra</th>
                <th>Costo de repuestos</th>
                <th className="td__botones">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mantenimientos.map((elemento, index) => (
                <tr key={index}>
                  {/* Aquí podrías usar un ID único en lugar de index */}
                  <td>{elemento.trabajos_realizados}</td>
                  <td>{elemento.vehiculo.patente}</td>
                  <td>{elemento.vehiculo.marca}</td>
                  {/* Formateo de fecha */}
                  <td>
                    {elemento.fecha[2]}/{elemento.fecha[1]}/{elemento.fecha[0]}
                  </td>
                  <td>${elemento.costos_manodeobra}</td>
                  <td>${elemento.costos_repuestos}</td>
                  <td className="td__botones tr-boton">
                    <button
                      className="btn btn-primary"
                      onClick={notificacion_no_implementado}
                    >
                      Editar
                    </button>
                    {"   "}
                    <button
                      className="btn btn-danger"
                      onClick={notificacion_no_implementado}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Mantenimiento;
