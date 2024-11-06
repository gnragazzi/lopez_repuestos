import { useEffect, useState } from "react";
import { useContextoGlobal } from "../../Contexto";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";

const Cargar_2 = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const axiosPrivado = useAxiosPrivado();
  const {
    acciones_camiones: { CARGAR_TECNICA },
    dispatch_camiones: dispatch,
    estado_camiones: estado,
  } = useContextoGlobal();
  useEffect(() => {
    setError("");
    setCargando(true);
    axiosPrivado
      .post("/tecnica?tipo=camion", estado)
      .then(() => {
        navegar("/vehiculos?tipo=camion");
        setCargando(false);
      })
      .catch((error) => {
        setCargando(false);
        setError(error.message);
      });
  }, [
    CARGAR_TECNICA,
    dispatch,
    fecha_emision,
    fecha_vencimiento,
    ubicacion,
    axiosPrivado,
  ]);
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
      <div className="App formulario">
        <h2>Confirme Selección</h2>
        <div className="confirmar__seleccion">
          <h4>
            Datos de la técnica
          </h4>
          <p>Fecha de emisión: ${fecha_emision}</p>
          <p>Fecha de vencimiento: ${fecha_vencimiento}</p>
          <p>Ubicación: ${ubicacion}</p>
        </div>
      </div>
    );
};

export default Cargar_2;
