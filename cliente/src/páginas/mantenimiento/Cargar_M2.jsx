/* eslint-disable react/prop-types */

const Cargar_M2 = ({ dispatch, estado, acciones }) => {
  const { SELECCIONAR_MECÁNICO } = acciones;

  const {
    cuerpo_cargar_mantenimiento: { mecanicosSeleccionados },
    lista_mecánicos,
  } = estado;
  return (
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
            {lista_mecánicos.map((mecanico) => {
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
                    dispatch({ type: SELECCIONAR_MECÁNICO, payload: dni });
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
  );
};

export default Cargar_M2;
