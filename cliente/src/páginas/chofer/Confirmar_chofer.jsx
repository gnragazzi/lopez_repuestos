import { useContextoGlobal } from "../../Contexto";

// eslint-disable-next-line react/prop-types
function Confirmar_chofer({ enviar }) {
  const {
    estado_choferes: {
      esModificacion,
      datos_anteriores: {
        dni: dni_anterior,
        cuil: cuil_anterior,
        nombre: nombre_anterior,
        apellido: apellido_anterior,
        domicilio: domicilio_anterior,
        telefono: telefono_anterior,
        fecha_nacimiento: fecha_nacimiento_anterior,
        fecha_psicotecnico: fecha_psicotecnico_anterior,
      },
      datos_chofer: {
        dni,
        cuil,
        nombre,
        apellido,
        domicilio,
        telefono,
        fecha_nacimiento,
        fecha_psicotecnico,
      },
    },
    dispatch_choferes: dispatch,
    acciones_choferes: { PANTALLA_ANTERIOR },
  } = useContextoGlobal();

  let datos_chofer_array;

  if (esModificacion) {
    datos_chofer_array = Object.entries({
      Dni: [dni, dni_anterior],
      Cuil: [cuil, cuil_anterior],
      Nombre: [nombre, nombre_anterior],
      Apellido: [apellido, apellido_anterior],
      Domicilio: [domicilio, domicilio_anterior],
      Teléfono: [telefono, telefono_anterior],
      "Fecha de Nacimiento": [fecha_nacimiento, fecha_nacimiento_anterior],
      "Fecha de Psicotécnico": [
        fecha_psicotecnico,
        fecha_psicotecnico_anterior,
      ],
    });
  } else {
    datos_chofer_array = Object.entries({
      Dni: dni,
      Cuil: cuil,
      Nombre: nombre,
      Apellido: apellido,
      Domicilio: domicilio,
      Teléfono: telefono,
      "Fecha de Nacimiento": fecha_nacimiento,
      "Fecha de Psicotécnico": fecha_psicotecnico,
    });
  }

  return (
    <>
      <div className="App formulario">
        <h2>
          {esModificacion ? "Confirme Modificaciones" : "Confirme Selección"}
        </h2>
        <div className="confirmar__seleccion">
          {esModificacion
            ? datos_chofer_array.map(
                ([atributo, [valor_nuevo, valor_viejo]], i) => {
                  if (valor_nuevo !== valor_viejo) {
                    return (
                      <p key={Date.now() * i}>
                        <strong>{atributo}: </strong>{" "}
                        {valor_viejo + " -> " + valor_nuevo}
                      </p>
                    );
                  }
                }
              )
            : datos_chofer_array.map(([atributo, valor], i) => {
                return (
                  <p key={Date.now() * i}>
                    <strong>{atributo}</strong>: {valor}
                  </p>
                );
              })}
        </div>
        <div className="botonera_formulario">
          <button
            className="formulario__boton volver"
            onClick={() => dispatch({ tipo: PANTALLA_ANTERIOR })}
          >
            Volver
          </button>
          <button className="formulario__boton siguiente" onClick={enviar}>
            Confirmar
          </button>
        </div>
      </div>
    </>
  );
}

export default Confirmar_chofer;
