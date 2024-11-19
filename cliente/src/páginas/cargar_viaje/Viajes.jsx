import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";

function Viajes() {
  const [viajes, setViajes] = useState([]);
  const axiosPrivado = useAxiosPrivado();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setCargando(true);
    axiosPrivado
      .get("/viajes")
      .then((response) => {
        setViajes(response.data);
        setCargando(false);
      })
      .catch((error) => {
        setError(error.message);
        setCargando(false);
      });
  }, [axiosPrivado]);
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
        <h2>Viajes</h2>
        <br />
        <div className="entregas-insertar-viajes">
          <Link
            to="cargar_viaje"
            rel="nofollow"
          >
            <button  className="btn btn-success">Insertar</button>
          </Link>
          <Link to="ver_entregas_tardias" rel="nofollow">
            <button className="btn-entregas">
              Ver Entregas Tardias
            </button>
          </Link>
        </div>

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
                  <td className="td__botones tr-boton acciones">
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
