import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useContextoGlobal } from "../Contexto";

function Mantenimiento() {
  const [mantenimientos, setMantenimientos] = useState([]);
  const { auth } = useContextoGlobal();

  useEffect(() => {
    axios
      .get("http://localhost:8080/mantenimiento", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      })
      .then((response) => {
        setMantenimientos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
                    onClick={() => console.log("Editar:", elemento)}
                  >
                    Editar
                  </button>
                  {"   "}
                  <button
                    className="btn btn-danger"
                    onClick={() => console.log("Eliminar:", elemento)}
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
