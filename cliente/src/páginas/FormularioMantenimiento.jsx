import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormularioMantenimiento = () => {
  const [pantalla, setPantalla] = useState(0);
  const [vehiculos, setVehiculos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState("");
  const [mecanicosSeleccionados, setmecanicosSeleccionados] = useState([]);
  const [esCamion, setEsCamion] = useState(false);
  const navegar = useNavigate();

  const [datos, setDatos] = useState({
    trabajos_realizados: "",
    costo_repuestos: 0,
    costo_manodeobra: 0,
    kilometros_en_que_se_realizo: 0,
    fecha: new Date().toISOString().substring(0, 10),
  });
  const enviarFormulario = () => {
    const {
      trabajos_realizados,
      costo_manodeobra,
      costo_repuestos,
      fecha,
      kilometros_en_que_se_realizo,
    } = datos;
    const cuerpo = {
      trabajos_realizados,
      fecha,
      costo_repuestos,
      costo_manodeobra,
      kilometros_en_que_se_realizo,
      vehiculo: {
        vehiculoSeleccionado,
        esCamion,
      },
      mecanicosSeleccionados,
    };

    axios
      .post("http://localhost:8080/mantenimiento", cuerpo, {
        headers: { "content-type": "application/json" },
      })
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
    <div className="App formulario">
      {/* elegir un vehículo de una lista */}
      {pantalla == 0 && (
        <>
          <h2>Seleccionar Vehículo</h2>
          <br />
          <div className="container__table form-table">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Patente</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.map((vehiculo) => {
                  const { patente, marca } = vehiculo;
                  return (
                    <tr
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
                        //verificamos un atributo que solo un camión tendría para determinar si es camión o semiremolque
                        vehiculo.potencia
                          ? setEsCamion(true)
                          : setEsCamion(false);
                      }}
                    >
                      <td>
                        <p>{marca}</p>
                      </td>
                      <td>
                        <p>{patente}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      {pantalla == 1 && (
        <>
          <h2>Seleccionar Mecánico</h2>
          <br />
          <div className="container__table form-table">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>DNI</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                </tr>
              </thead>
              <tbody>
                {mecanicos.map((mecanico) => {
                  const { dni, nombre, apellido } = mecanico;
                  return (
                    <tr
                      className={
                        mecanicosSeleccionados.includes(dni)
                          ? "vehiculos_lista vehiculos_lista_seleccionado"
                          : "vehiculos_lista"
                      }
                      key={dni}
                      onClick={() => {
                        mecanicosSeleccionados.includes(dni)
                          ? setmecanicosSeleccionados(
                              mecanicosSeleccionados.filter((m) => m != dni)
                            )
                          : setmecanicosSeleccionados([
                              ...mecanicosSeleccionados,
                              dni,
                            ]);
                      }}
                    >
                      <td>
                        <p>{dni}</p>
                      </td>
                      <td>
                        <p>{nombre}</p>
                      </td>
                      <td>
                        <p>{apellido}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      {pantalla == 2 && (
        <>
          <h2>Detalles</h2>
          <form className="form-table form__mantenimiento">
            <fieldset className="form__items-mantenimiento">
              <legend className="form__legend">Ingrese el trabajo</legend>
              <textarea
                className="items__input input__textarea"
                placeholder="Ingrese el trabajo que se hizo"
                value={datos.trabajos_realizados}
                onChange={(e) =>
                  setDatos({ ...datos, trabajos_realizados: e.target.value })
                }
              />
            </fieldset>
            <fieldset className="form__items-mantenimiento">
              <legend className="form__legend">Costo de Repuesto</legend>
              <input
                className="items__input"
                placeholder="Costo de Repuesto"
                type="number"
                value={datos.costo_repuestos}
                onChange={(e) =>
                  setDatos({ ...datos, costo_repuestos: e.target.value })
                }
              />
            </fieldset>
            <fieldset className="form__items-mantenimiento">
              <legend className="form__legend">Costo de Mano de Obra</legend>
              <input
                className="items__input"
                placeholder="Costo de Mano de Obra"
                type="number"
                value={datos.costo_manodeobra}
                onChange={(e) =>
                  setDatos({ ...datos, costo_manodeobra: e.target.value })
                }
              />
            </fieldset>
            {esCamion && (
              <fieldset className="form__items-mantenimiento">
                <legend className="form__legend">
                  Kilometros del camión en que se realizó el mantenimiento
                </legend>
                <input
                  className="items__input"
                  placeholder="Kilometros del camión"
                  type="number"
                  value={datos.kilometros_en_que_se_realizo}
                  onChange={(e) =>
                    setDatos({
                      ...datos,
                      kilometros_en_que_se_realizo: e.target.value,
                    })
                  }
                />
              </fieldset>
            )}

            <fieldset className="form__items-mantenimiento">
              <legend className="form__legend">Fecha</legend>
              <input
                className="items__input"
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
          <div className="confirmar__seleccion">
            <h3>Vehículo: </h3>
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
                mecanicosSeleccionados.includes(m.dni) && (
                  <p key={m.dni}>
                    Nombre: {m.nombre} {m.apellido} | DNI: {m.dni}
                  </p>
                )
              );
            })}
            <p>Trabajo Realizado: {datos.trabajos_realizados}</p>
            <p>Costo Repuesto: {datos.costo_repuestos}</p>
            <p>Costo Mano de Obra: {datos.costo_manodeobra}</p>
            {esCamion && (
              <p>
                Kilometros del camión en que se realizó el mantenimiento:{" "}
                {datos.kilometros_en_que_se_realizo}
              </p>
            )}
            <p>Fecha: {datos.fecha}</p>
          </div>
        </>
      )}

      <div className="botonera_formulario">
        {pantalla == 0 && (
          <button
            className="formulario__boton volver"
            onClick={() => navegar("/mantenimiento")}
          >
            Volver
          </button>
        )}
        {pantalla > 0 && (
          <button
            className="formulario__boton volver"
            onClick={() => setPantalla(pantalla - 1)}
          >
            Volver
          </button>
        )}
        {pantalla < 3 && (
          <button
            className="formulario__boton siguiente"
            onClick={() => {
              if (
                (pantalla == 0 && vehiculoSeleccionado) ||
                (pantalla == 1 && mecanicosSeleccionados.length > 0) ||
                (pantalla == 2 &&
                  datos.costo_manodeobra &&
                  datos.costo_repuestos &&
                  datos.trabajos_realizados &&
                  datos.fecha)
              )
                setPantalla(pantalla + 1);
            }}
          >
            Siguiente
          </button>
        )}
        {pantalla == 3 && (
          <button
            className="formulario__boton siguiente"
            onClick={enviarFormulario}
          >
            Confirmar
          </button>
        )}
      </div>
    </div>
  );
};

export default FormularioMantenimiento;
