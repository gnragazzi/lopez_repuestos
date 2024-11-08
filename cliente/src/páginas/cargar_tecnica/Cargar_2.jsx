import { useContextoGlobal } from "../../Contexto";

const Cargar_2 = () => {
  const { estado_tecnica: estado } = useContextoGlobal();
  const { fecha_emision, fecha_vencimiento, ubicacion } = estado;

  return (
    <div className="App formulario">
      <h2>Confirme Selección</h2>
      <div className="confirmar__seleccion">
        <h4>Datos de la técnica</h4>
        <br />
        <div>
          <h4>Fechas</h4>
          <p>Fecha de emisión: {fecha_emision}</p>
          <p>Fecha de vencimiento: {fecha_vencimiento}</p>
        </div>
        <div>
          <h4>Ubicacion</h4>
          <p>Localidad: {ubicacion}</p>
        </div>
        
      </div>
    </div>
  );
};

export default Cargar_2;
