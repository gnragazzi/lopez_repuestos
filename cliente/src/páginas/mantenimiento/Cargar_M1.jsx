/* eslint-disable react/prop-types */
const Cargar_M1 = ({ dispatch, estado, acciones }) => {
  const { SELECCIONAR_VEHICULO } = acciones;

  const {
    cuerpo_cargar_mantenimiento: {
      vehiculo: { vehiculoSeleccionado },
    },
    lista_vehículos,
  } = estado;
  return (
    <>
      <h2>Seleccionar Vehículo</h2>
      <br />
      <div className="container__table form-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Patente</th>
            </tr>
          </thead>
          <tbody>
            {lista_vehículos.map((vehiculo) => {
              const { patente, marca } = vehiculo;
              return (
                <tr
                  className={
                    vehiculoSeleccionado == patente
                      ? "vehiculos_lista vehiculos_lista_seleccionado"
                      : "vehiculos_lista"
                  }
                  key={patente}
                  onClick={() => {
                    patente != vehiculoSeleccionado
                      ? dispatch({
                          type: SELECCIONAR_VEHICULO,
                          payload: {
                            patente,
                            esCamion: Boolean(vehiculo.potencia),
                          },
                        })
                      : dispatch({
                          type: SELECCIONAR_VEHICULO,
                          payload: { patente: "", esCamion: false },
                        });
                  }}
                >
                  <td>
                    <p>{marca}</p>
                  </td>
                  <td>
                    <p>{patente}</p>
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

export default Cargar_M1;
