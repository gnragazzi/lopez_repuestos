import { useContextoGlobal } from "../../Contexto";

const Seguro_2 = () => {
  const { estado_seguro: estado } = useContextoGlobal();

  const {
    fecha_emision,
    fecha_vencimiento,
    tipo,
    pago,
    nombre_aseguradora,
    vehiculo_seleccionado,
  } = estado;

  return (
    <div className="App formulario">
      <h2>Confirme Selección</h2>
      <div className="confirmar__seleccion">
        <h4>Datos del seguro</h4>
        <br />

        <h4>Vehículo</h4>
        <p>Patente : {vehiculo_seleccionado}</p>
        <div>
          <h4>Aseguradora</h4>
          <p> {nombre_aseguradora} </p>
        </div>
        <div>
          <h4>Tipo</h4>
          <p> {tipo} </p>
        </div>
        <div>
          <h4>Pago</h4>
          <p>${pago}</p>
        </div>
        <div>
          <h4>Fechas</h4>
          <p>Fecha de emisión: {fecha_emision}</p>
          <p>Fecha de vencimiento: {fecha_vencimiento}</p>
        </div>
      </div>
    </div>
  );
};

export default Seguro_2;
