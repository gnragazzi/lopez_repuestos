import { useContextoGlobal } from "../../Contexto";
import { useState, useEffect } from "react";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";

const Listar_seguro = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const {
    estado_seguro: estado,
    dispatch_seguro: dispatch,
    acciones_seguro: acciones,
  } = useContextoGlobal();

  const { vehiculo_seleccionado } = estado;

  const { PROXIMA_PAGINA_SEGURO, CARGAR_SEGURO } = acciones;

  const axiosPrivado = useAxiosPrivado();

  useEffect(() => {
    setError("");
    setCargando(true);
    axiosPrivado
      .get(`/seguro?patente=${vehiculo_seleccionado}`)
      .then((res) => {
        const {
          fecha_emision,
          fecha_vencimiento,
          pago,
          tipo,
          nombre_aseguradora,
        } = res.data;

        dispatch({
          type: CARGAR_SEGURO,
          payload: {
            fecha_emision,
            fecha_vencimiento,
            pago,
            tipo,
            nombre_aseguradora,
          },
        });

        setCargando(false);
      })
      .catch(() => console.log("No Hay seguros cargados"));
  }, [CARGAR_SEGURO, axiosPrivado, dispatch, vehiculo_seleccionado]);

  const {
    fecha_emision: emision_ultimo,
    fecha_vencimiento: vencimiento_ultimo,
  } = estado.ultimo_seguro;
  return (
    <div className="App formulario">
      <h2>Datos de seguro actual</h2>
      <button
        className="enlace_cargar_mantenimiento btn btn-success"
        onClick={() => dispatch({ type: PROXIMA_PAGINA_SEGURO })}
      >
        Insertar
      </button>
      {estado.ultimo_seguro.nombre_aseguradora && (
        <div className="confirmar__seleccion">
          <br />
          <h4>Vehiculo</h4>
          <p>Patente : {vehiculo_seleccionado}</p>
          <br />
          <div>
            <h4>Aseguradora</h4>
            <p> {estado.ultimo_seguro.nombre_aseguradora} </p>
          </div>
          <div>
            <h4>Tipo</h4>
            <p> {estado.ultimo_seguro.tipo} </p>
          </div>
          <div>
            <h4>Pago</h4>
            <p>${estado.ultimo_seguro.pago}</p>
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
      {estado.ultimo_seguro.nombre_aseguradora.trim() == "" && (
        <div className="confirmar__seleccion">
          <h4>Vehiculo</h4>
          <p>Patente : {vehiculo_seleccionado}</p>
          <div>
            <br />
            <h4>Datos del seguro</h4>
            <p>No hay seguros cargados actualmente</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Listar_seguro;
