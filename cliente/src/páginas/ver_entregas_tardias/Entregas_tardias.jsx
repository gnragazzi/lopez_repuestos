import { Link } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";



function Entregas_tardias() {
    const [viajes, setViajes] = useState([]);
    const axiosPrivado = useAxiosPrivado();
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const calcular_tardanza = (fecha_esperada, fecha_llegada) => {

        const esperada = new Date(fecha_esperada);
        const llegada = new Date(fecha_llegada);
        return (llegada- esperada) / (1000 * 60 * 60 * 24);

      };

    useEffect(() => {
      setError("");
      setCargando(true);
      axiosPrivado
        .get("/viajes?entregas_tardias=1")
        .then((response) => {
          setViajes(response.data);
          setCargando(false);
        })
        .catch((error) => {
          setError(error.message);
          setCargando(false);
        });
    }, [axiosPrivado]);

    return (
        <div className="App">
        <h2>Entregas Tardías</h2>
        <div className="container__table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Camión</th>
                <th>Chofer</th>
                <th>Semirremolque</th>
                <th>Fecha de partida</th>
                <th>Fecha de llegada</th>
                <th>Fecha esperada</th>
                <th>Tardanza</th>
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
                  <td>
                  {elemento.fecha_esperada[2]}/{elemento.fecha_esperada[1]}/
                  {elemento.fecha_esperada[0]}
                  </td>
                  <td>{calcular_tardanza(elemento.fecha_esperada, elemento.fecha_llegada)} días</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="botonera_formulario">
          <Link to="..">
            <button className="formulario__boton volver">
                Volver
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  export default Entregas_tardias;