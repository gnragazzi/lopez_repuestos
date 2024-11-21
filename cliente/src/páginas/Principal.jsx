import { useEffect } from "react";
import { useContextoGlobal } from "../Contexto";
import Notificación from "../componentes/Notificación";
import { FiRefreshCcw } from "react-icons/fi";
import usePoblarLista from "../utilidades/usePoblarLista";

function Principal() {
  const {
    estado_vencimiento: {
      lista,
      flagCargado,
      listaModificada,
      seModificoLista,
    },
    dispatch_vencimientos: dispatch,
    acciones_vencimientos: { DESCARTAR_ITEM },
  } = useContextoGlobal();

  const poblarLista = usePoblarLista();

  useEffect(() => {
    /*dispatch({
      tipo: ACTUALIZAR_LISTA_VENCIMIENTOS,
      payload: { fecha_vencimiento: "2024-11-20", idVencimiento: 12 },
    });*/
    if (!flagCargado || seModificoLista) {
      poblarLista();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <h2 style={{ fontSize: '2rem' }}>Notificaciones</h2>
      {(lista?.length <= 0 || listaModificada) && (
        <FiRefreshCcw
          className="notificaciones_recargar"
          onClick={poblarLista}
        />
      )}
      <div className="container_notificaciones">
        {lista?.length > 0 ? (
          lista.map(({ id, titulo, datos, fecha, funcionVer }) => {
            return (
              <Notificación
                key={id}
                titulo={titulo}
                datos={datos}
                fecha={fecha}
                id={id}
                funcionDescartar={() =>
                  dispatch({ tipo: DESCARTAR_ITEM, payload: id })
                }
                funcionVer={funcionVer}
              />
            );
          })
        ) : (
          <div className="notificacion_no_urgente">
            <h3 className="notificacion_titulo">
              No hay Notificaciones Pendientes
            </h3>
          </div>
        )}
      </div>
    </>
  );
}

export default Principal;
