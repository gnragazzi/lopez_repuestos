import { useEffect, useState } from "react";
import { useContextoGlobal } from "../../Contexto";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";

const Costos_2 = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const axiosPrivado = useAxiosPrivado();
  const {
    acciones_camiones: { CARGAR_COSTO },
    dispatch_camiones: dispatch,
    estado_camiones: {
      lista_camiones,
      camion_seleccionado,
      mes_costo,
      año_costo,
      costos: {
        costo_repuestos,
        cost_mano_de_obra,
        costo_combustible,
        kilometros_realizados,
        costos_por_kilometros,
      },
    },
  } = useContextoGlobal();
  useEffect(() => {
    setError("");
    setCargando(true);
    axiosPrivado
      .get(
        `/vehiculos?costos=${año_costo}-${
          mes_costo + 1 < 10 ? "0" + (mes_costo + 1) : mes_costo + 1
        }&patente=${camion_seleccionado}`
      )
      .then((res) => {
        const {
          cost_mano_de_obra,
          costo_combustible,
          costo_repuestos,
          costos_por_kilometros,
          kilometros_realizados,
        } = res.data;

        dispatch({
          type: CARGAR_COSTO,
          payload: {
            cost_mano_de_obra,
            costo_combustible,
            costo_repuestos,
            costos_por_kilometros,
            kilometros_realizados,
          },
        });
        setCargando(false);
      })
      .catch((error) => {
        setCargando(false);

        setError(error.message);
      });
  }, [
    CARGAR_COSTO,
    año_costo,
    camion_seleccionado,
    dispatch,
    mes_costo,
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
          {lista_camiones.map((v) => {
            return (
              camion_seleccionado == v.patente && (
                <div key={v.patente}>
                  <h4>Camión:</h4>
                  <p>
                    Marca: {v.marca} | Patente {v.patente}
                  </p>
                </div>
              )
            );
          })}
          <h4>
            Datos del período {mes_costo + 1}-{año_costo}:
          </h4>
          <p>Kilometros Realizados: {kilometros_realizados}km</p>
          <p>Costo total de Combustible: ${costo_combustible}</p>
          <p>Costo total por mano de obra: ${cost_mano_de_obra}</p>
          <p>Costo total por repuestos: ${costo_repuestos}</p>
          <br />
          <p>Costo Por Kilómetro: ${costos_por_kilometros}/km</p>
        </div>
      </div>
    );
};

export default Costos_2;
