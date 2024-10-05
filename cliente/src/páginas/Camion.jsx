import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Camiones() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/vehiculos");
        const camionesData = Array.isArray(response.data) ? response.data : [];
        
        setData(camionesData);
      } catch (error) {
        console.error("Error al traer los datos:", error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h2>Camiones</h2>
      <br />
      <Link to="nuevo" className="enlace_cargar_mantenimiento">
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
            {data.length === 0 ? (
              <tr>
                <td colSpan="4">No hay datos disponibles</td>
              </tr>
            ) : (
              data.map((elemento) => (
                <tr key={elemento.id}>
                  <td>{elemento.patente}</td>
                  <td>{elemento.marca}</td>
                  <td>{elemento.modelo}</td>
                  <td>{elemento.kilometraje}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => console.log('Editar:', elemento)}
                    >
                      Editar
                    </button>{" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => console.log('Eliminar:', elemento)}
                    >
                      Eliminar
                    </button>{" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => console.log('Costos:', elemento)}
                    >
                      Costos
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Camiones;