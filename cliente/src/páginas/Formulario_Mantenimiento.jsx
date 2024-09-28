import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Formulario_Mantenimiento = () => {
  const navegar = useNavigate();
  const [pantalla, setPantalla] = useState(0);
  const [vehiculos, setVehiculos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState("WUB 750");
  const [mecanicoSeleccionado, setMecanicoSeleccionado] = useState([
    "455555555",
  ]);
  const [datos, setDatos] = useState({
    trabajo: "gola",
    costo_repuesto: 1,
    costo_mano: 1,
    fecha: new Date().toISOString().substring(0, 10),
  });
  const enviarFormulario = () => {
    axios
      .post(
        "http://localhost:8080/mantenimiento",
        {
          vehiculoSeleccionado,
          mecanicoSeleccionado,
          datos,
        },
        { headers: { "content-type": "application/json" } }
      )
      .then((res) => console.log(res));
    navegar("/mantenimiento");
  };
  useEffect(() => {
    axios.create({ timeout: 1000 });
    axios
      .get("http://localhost:8080/vehiculos", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setVehiculos(res.data);
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:8080/mecanicos", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setMecanicos(res.data);
      });
  }, []);
  return (
    <div className="formulario">
      {/* elegir un vehículo de una lista */}
      {pantalla == 0 && (
        <>
          <h2>Seleccionar Vehículo</h2>
          <ul>
            <li className="vehiculos_lista header_lista">
              <p>Marca</p>
              <p>Patente</p>
            </li>
            {vehiculos.map((vehiculo) => {
              const { patente, marca } = vehiculo;
              return (
                <li
                  className={
                    vehiculoSeleccionado == patente
                      ? "vehiculos_lista vehiculos_lista_seleccionado"
                      : "vehiculos_lista"
                  }
                  key={patente}
                  onClick={() => {
                    patente != vehiculoSeleccionado
                      ? setVehiculoSeleccionado(patente)
                      : setVehiculoSeleccionado("");
                  }}
                >
                  <p>{marca}</p>
                  <p>{patente}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {pantalla == 1 && (
        <>
          <h2>Seleccionar Mecánico</h2>
          <ul>
            <li className="vehiculos_lista header_lista">
              <p>DNI</p>
              <p>Nombre</p>
              <p>Apellido</p>
            </li>
            {mecanicos.map((mecanico) => {
              const { dni, nombre, apellido } = mecanico;
              return (
                <li
                  className={
                    mecanicoSeleccionado.includes(dni)
                      ? "vehiculos_lista vehiculos_lista_seleccionado"
                      : "vehiculos_lista"
                  }
                  key={dni}
                  onClick={() => {
                    mecanicoSeleccionado.includes(dni)
                      ? setMecanicoSeleccionado(
                          mecanicoSeleccionado.filter((m) => m != dni)
                        )
                      : setMecanicoSeleccionado([...mecanicoSeleccionado, dni]);
                  }}
                >
                  <p>{dni}</p>
                  <p>{nombre}</p>
                  <p>{apellido}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {pantalla == 2 && (
        <>
          <h2>Algunos Datos Más...</h2>
          <form>
            <fieldset>
              <legend>Ingrese el trabajo</legend>
              <textarea
                placeholder="Ingrese el trabajo que se hizo"
                value={datos.trabajo}
                onChange={(e) =>
                  setDatos({ ...datos, trabajo: e.target.value })
                }
              />
            </fieldset>
            <fieldset>
              <legend>Costo de Repuesto</legend>
              <input
                placeholder="Costo de Repuesto"
                type="number"
                value={datos.costo_repuesto}
                onChange={(e) =>
                  setDatos({ ...datos, costo_repuesto: e.target.value })
                }
              />
            </fieldset>
            <fieldset>
              <legend>Costo de Mano de Obra</legend>
              <input
                placeholder="Costo de Mano de Obra"
                type="number"
                value={datos.costo_mano}
                onChange={(e) =>
                  setDatos({ ...datos, costo_mano: e.target.value })
                }
              />
            </fieldset>
            <fieldset>
              <legend>Fecha</legend>
              <input
                type="date"
                value={datos.fecha}
                onChange={(e) => {
                  setDatos({ ...datos, fecha: e.target.value });
                }}
              />
            </fieldset>
          </form>
        </>
      )}
      {pantalla == 3 && (
        <>
          <h2>Confirme Selección</h2>
          {vehiculos.map((v) => {
            return (
              v.patente == vehiculoSeleccionado && (
                <p key={v.patente}>
                  Marca: {v.marca} | Patente {v.patente}
                </p>
              )
            );
          })}
          {mecanicos.map((m) => {
            return (
              mecanicoSeleccionado.includes(m.dni) && (
                <p key={m.dni}>
                  Nombre: {m.nombre} {m.apellido} | DNI: {m.dni}
                </p>
              )
            );
          })}
          <p>Trabajo Realizado: {datos.trabajo}</p>
          <p>Costo Repuesto: {datos.costo_repuesto}</p>
          <p>Costo Mano de Obra: {datos.costo_mano}</p>
          <p>Fecha: {datos.fecha}</p>
        </>
      )}

      <div className="botonera_formulario">
        {pantalla == 0 && (
          <button onClick={() => navegar("/mantenimiento")}>
            Volver a la Pantalla Anterior
          </button>
        )}
        {pantalla > 0 && (
          <button onClick={() => setPantalla(pantalla - 1)}>Volver</button>
        )}
        {pantalla < 3 && (
          <button
            onClick={() => {
              if (
                (pantalla == 0 && vehiculoSeleccionado) ||
                (pantalla == 1 && mecanicoSeleccionado.length > 0) ||
                (pantalla == 2 &&
                  datos.costo_mano &&
                  datos.costo_repuesto &&
                  datos.trabajo &&
                  datos.fecha)
              )
                setPantalla(pantalla + 1);
            }}
          >
            Próxima Pantalla
          </button>
        )}
        {pantalla == 3 && <button onClick={enviarFormulario}>Confirmar</button>}
      </div>
    </div>
  );
};
