import { useContextoGlobal } from "../../Contexto";
import { useState, useEffect } from "react";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";

const Listar_tecnica = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const {
    estado_tecnica: estado,
    dispatch_tecnica: dispatch,
    acciones_tecnica: acciones,
  } = useContextoGlobal();

  const { vehiculo_seleccionado } = estado;

  const { PROXIMA_PAGINA_TECNICA, CARGAR_TECNICA } = acciones;

  const axiosPrivado = useAxiosPrivado();

  useEffect(() => {
    setError("");
    setCargando(true);
    console.log(vehiculo_seleccionado);
    axiosPrivado
      .get(`/tecnica?patente=${vehiculo_seleccionado}`)
      .then((res) => {
        const { fecha_emision, fecha_vencimiento, ubicacion } = res.data;

        console.log(ubicacion);
        dispatch({
          type: CARGAR_TECNICA,
          payload: {
            fecha_emision,
            fecha_vencimiento,
            ubicacion,
          },
        });

        setCargando(false);
      })
      .catch(() => {
        console.log("No hay Técnica");
      });
  }, [vehiculo_seleccionado]);

  const {
    fecha_emision: emision_ultimo,
    fecha_vencimiento: vencimiento_ultimo,
  } = estado.ultima_tecnica;

  return (
    <div className="App formulario">
      <h2>Datos de técnica actual</h2>
      <button
        className="enlace_cargar_mantenimiento btn btn-success"
        onClick={() => dispatch({ type: PROXIMA_PAGINA_TECNICA })}
      >
        Insertar
      </button>
      {estado.ultima_tecnica.ubicacion && (
        <div className="confirmar__seleccion">
          <br />
          <h4>Vehículo</h4>
          <p>Patente : {vehiculo_seleccionado}</p>
          <br />
          <div>
            <h4>Ubicación</h4>
            <p> {estado.ultima_tecnica.ubicacion} </p>
          </div>
          <div>
            <h4>Fechas</h4>
            <p>
              Fecha de emisión: {emision_ultimo[2]}/{emision_ultimo[1]}/
              {emision_ultimo[0]}{" "}
            </p>
            <p>
              Fecha de vencimiento: {vencimiento_ultimo[2]}/
              {vencimiento_ultimo[1]}/{vencimiento_ultimo[0]}
            </p>
          </div>
        </div>
      )}
      {estado.ultima_tecnica.ubicacion.trim() == "" && (
        <div className="confirmar__seleccion">
          <h4>Vehículo</h4>
          <p>Patente : {vehiculo_seleccionado}</p>
          <div>
            <br />
            <h4>Datos de la técnica</h4>
            <p>No hay técnicas cargados actualmente</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Listar_tecnica;
