import { useEffect, useState } from "react";
import { useContextoGlobal } from "../../Contexto";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";

const Costos_2 = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const axiosPrivado = useAxiosPrivado();
  const {
    acciones_camiones: {
      CARGAR_COSTO_MANTENIMIENTO,
      CARGAR_COSTO_VIAJE,
      CARGAR_COSTOS_POR_KILOMETROS,
    },
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
        `/mantenimiento?costos=${año_costo}-${
          mes_costo + 1 < 10 ? "0" + (mes_costo + 1) : mes_costo + 1
        }&patente=${camion_seleccionado}`
      )
      .then((res) => {
        const { cost_mano_de_obra, costo_repuestos } = res.data;

        dispatch({
          type: CARGAR_COSTO_MANTENIMIENTO,
          payload: {
            cost_mano_de_obra,
            costo_repuestos,
          },
        });

        axiosPrivado
          .get(
            `/viajes?costos=${año_costo}-${
              mes_costo + 1 < 10 ? "0" + (mes_costo + 1) : mes_costo + 1
            }&patente=${camion_seleccionado}`
          )
          .then((resultado) => {
            const { costo_combustible, kilometros_realizados } = resultado.data;
            console.log(resultado.data);

            dispatch({
              type: CARGAR_COSTO_VIAJE,
              payload: {
                costo_combustible,
                kilometros_realizados,
              },
            }); 
            dispatch({
              type: CARGAR_COSTOS_POR_KILOMETROS,
            })
          });

        setCargando(false);
      })
      .catch((error) => {
        setCargando(false);

        setError(error.message);
      });
  }, [
    CARGAR_COSTO_VIAJE,
    CARGAR_COSTO_MANTENIMIENTO,
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
          <p>Costo Por Kilómetro: ${costos_por_kilometros.toFixed(2)}/km</p>
        </div>
      </div>
    );
};

export default Costos_2;
