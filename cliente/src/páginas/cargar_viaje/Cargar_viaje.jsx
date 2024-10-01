import { useState } from "react";
import Cargar_viaje_1 from "./Cargar_viaje_1";
import Cargar_viaje_2 from "./Cargar_viaje_2";
import Cargar_viaje_3 from "./Cargar_viaje_3";

export const Cargar_viaje = () => {
  const [cuerpoPost, setCuerpoPost] = useState({
    fecha_partida: null,
    fecha_llegada: null,
    fecha_esperada: null,
    kilometros_realizados: 0,
    costos_combustibles: 0,
    destinos: "",
    camion: "",
  });
  const [pantalla, setPantalla] = useState(0);
  /*
    1. camion: "",
    2. destinos: "",
    3. kilometros_realizados: 0,
    4. costos_combustibles: 0,
    
    1. Fecha de partida
    2. Fecha de llegada
    3. Fecha Esperada

    Página de confirmación
*/
  const manejarCambioPantalla = () => {
    setPantalla(pantalla + 1);
  };
  return (
    <>
      {pantalla == 0 && <Cargar_viaje_1 />}
      {pantalla == 1 && <Cargar_viaje_2 />}
      {pantalla == 2 && <Cargar_viaje_3 />}
    </>
  );
};
