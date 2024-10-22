import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useContextoGlobal } from "../Contexto";

function Viajes() {
  const [viajes, setViajes] = useState([]);
  const { auth } = useContextoGlobal();

  useEffect(() => {
    axios
      .get("http://localhost:8080/viajes", {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((response) => {
        setViajes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <h2>Viajes</h2>
      <br />
      <Link
        to="cargar_viaje"
        className="enlace_cargar_mantenimiento"
        rel="nofollow"
      >
        <button className="btn btn-success">Insertar</button>
      </Link>
      <div className="container__table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Camion</th>
              <th>Chofer</th>
              <th>Semirremolque</th>
              <th>Fecha de partida</th>
              <th>Fecha de llegada</th>
              <th>Destino</th>
              <th className="td__botones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {viajes.map((elemento, index) => (
              <tr key={index}>
                <td>{elemento.camion.patente}</td>
                <td>{elemento.chofer.dni}</td>
                <td>{elemento.semirremolque.patente}</td>
                <td>
                  {elemento.fecha_partida[2]}/{elemento.fecha_partida[1]}/
                  {elemento.fecha_partida[0]}
                </td>
                <td>
                  {elemento.fecha_llegada[2]}/{elemento.fecha_llegada[1]}/
                  {elemento.fecha_llegada[0]}
                </td>
                <td>{elemento.destino}</td>
                <td className="td__botones tr-boton">
                  <button
                    className="btn btn-primary"
                    onClick={() => console.log("Editar:", elemento)}
                  >
                    Editar
                  </button>
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

export default Viajes;
