import { useContextoGlobal } from "../Contexto";
import { useNavigate } from "react-router-dom";
import useAxiosPrivado from "./useAxiosPrivado";
import { toast } from "react-toastify";

const usePoblarLista = () => {
  const navegar = useNavigate();
  const axiosPrivado = useAxiosPrivado();
  const {
    acciones_seguro,
    acciones_tecnica,
    acciones_vencimientos,
    dispatch_seguro,
    dispatch_tecnica,
    dispatch_vencimientos,
  } = useContextoGlobal();
  const poblarLista = () => {
    const {
      RESETEAR_ESTADO: RESETEAR_ESTADO_SEGURO,
      CARGAR_DESDE_VENCIMIENTO: CARGAR_SEGURO,
    } = acciones_seguro;
    const {
      RESETEAR_ESTADO: RESETEAR_ESTADO_TECNICA,
      CARGAR_DESDE_VENCIMIENTO: CARGAR_TECNICA,
    } = acciones_tecnica;
    const { CARGAR_VENCIMIENTOS, POBLAR_LISTA } = acciones_vencimientos;
    const verSeguro = (elem, id) => {
      dispatch_seguro({ type: RESETEAR_ESTADO_SEGURO });
      dispatch_seguro({
        type: CARGAR_SEGURO,
        payload: {
          vehiculo_seleccionado: elem.patente,
          esCamion: elem.kilometraje ? "camion" : "semirremolque",
          idVencimiento: id,
        },
      });
      navegar(
        elem.kilometraje
          ? "/vehículos/camiones/seguro"
          : "/vehículos/semirremolques/seguro"
      );
    };

    const verTecnica = (elem, id) => {
      dispatch_tecnica({ type: RESETEAR_ESTADO_TECNICA });
      dispatch_tecnica({
        type: CARGAR_TECNICA,
        payload: {
          vehiculo_seleccionado: elem.patente,
          esCamion: elem.kilometraje ? "camion" : "semirremolque",
          idVencimiento: id,
        },
      });
      navegar(
        elem.kilometraje
          ? "/vehículos/camiones/tecnica"
          : "/vehículos/semirremolques/tecnica"
      );
    };
    axiosPrivado
      .get("/vencimientos")
      .then((res) => {
        console.log(res.data);
        dispatch_vencimientos({ tipo: CARGAR_VENCIMIENTOS, payload: res.data });
        const {
          sinSeguro,
          seguroVencido,
          sinTarjetaRuta,
          tarjetaRutaVencida,
          sinTecnica,
          tecnicaVencida,
          choferes,
        } = res.data;
        const aux = [];
        let id = 0;
        sinSeguro?.forEach((elem) => {
          const { marca, modelo, tipo, patente } = elem;
          aux.push({
            id: id++,
            titulo: `${
              elem.kilometraje ? "Camión" : "Semirremolque"
            } sin Seguro`,
            datos: `${marca} ${modelo ? modelo : tipo}-${patente}`,
            fecha: "",
            funcionVer: (id) => verSeguro(elem, id),
          });
        });
        sinTecnica?.forEach((elem) => {
          const { marca, modelo, tipo, patente } = elem;
          aux.push({
            id: id++,
            titulo: `${
              elem.kilometraje ? "Camión" : "Semirremolque"
            } sin Verificación Técnica`,
            datos: `${marca} ${modelo ? modelo : tipo}-${patente}`,
            fecha: "",
            funcionVer: (id) => {
              verTecnica(elem, id);
            },
          });
        });
        sinTarjetaRuta?.forEach((elem) => {
          const { marca, modelo, tipo, patente } = elem;
          aux.push({
            id: id++,
            titulo: `${
              elem.kilometraje ? "Camión" : "Semirremolque"
            } sin Tarjeta-Ruta`,
            datos: `${marca} ${modelo ? modelo : tipo}-${patente}`,
            fecha: "",
            funcionVer: () => navegar("/tarjeta-ruta"),
          });
        });
        choferes?.forEach((ch) => {
          const {
            dni,
            nombre,
            apellido,
            fecha_psicotecnico: [año, mes, dia],
          } = ch;
          const hastaVencimiento =
            new Date(año, mes - 1, dia).getTime() - Date.now();
          const yaVencio = hastaVencimiento < 0;
          aux.push({
            id: id++,
            titulo: `Evaluación Psicotécnica de Chofer ${
              yaVencio
                ? "Vencido"
                : `por Vencer en ${Math.ceil(
                    hastaVencimiento / (1000 * 60 * 60 * 24)
                  )} días`
            }`,
            datos: `${nombre} ${apellido}-${dni}`,
            fecha: { dia, mes, año },
            funcionVer: () => navegar("/psicotecnica"),
          });
        });
        // seguros vencidos y por vencer
        seguroVencido?.forEach((elem) => {
          const {
            kilometraje,
            marca,
            modelo,
            tipo,
            patente,
            seguro: [ultimo],
          } = elem;
          const {
            fecha_vencimiento: [año, mes, dia],
          } = ultimo;
          const hastaVencimiento =
            new Date(año, mes - 1, dia).getTime() - Date.now();
          const yaVencio = hastaVencimiento < 0;
          aux.push({
            id: id++,
            titulo: `Seguro de ${kilometraje ? "Camión" : "Semirremolque"} ${
              yaVencio
                ? "Vencido"
                : `por Vencer en ${Math.ceil(
                    hastaVencimiento / (1000 * 60 * 60 * 24)
                  )} días`
            }`,
            datos: `${marca} ${modelo ? modelo : tipo}-${patente}`,
            fecha: { dia, mes, año },
            funcionVer: (id) => verSeguro(elem, id),
          });
        });
        tecnicaVencida?.forEach((elem) => {
          const {
            kilometraje,
            marca,
            modelo,
            tipo,
            patente,
            tecnica: [ultimo],
          } = elem;
          const {
            fecha_vencimiento: [año, mes, dia],
          } = ultimo;
          const hastaVencimiento =
            new Date(año, mes - 1, dia).getTime() - Date.now();
          const yaVencio = hastaVencimiento < 0;
          aux.push({
            id: id++,
            titulo: `Tecnica de ${kilometraje ? "Camión" : "Semirremolque"} ${
              yaVencio
                ? "Vencida"
                : `por Vencer en ${Math.ceil(
                    hastaVencimiento / (1000 * 60 * 60 * 24)
                  )} días`
            }`,
            datos: `${marca} ${modelo ? modelo : tipo}-${patente}`,
            fecha: { dia, mes, año },
            funcionVer: (id) => verTecnica(elem, id),
          });
        });
        tarjetaRutaVencida?.forEach((elem) => {
          const {
            kilometraje,
            marca,
            modelo,
            tipo,
            patente,
            tarjeta_ruta: {
              fecha_vencimiento: [año, mes, dia],
            },
          } = elem;
          const hastaVencimiento =
            new Date(año, mes - 1, dia).getTime() - Date.now();
          const yaVencio = hastaVencimiento < 0;
          aux.push({
            id: id++,
            titulo: `Tarjeta-Ruta de ${
              kilometraje ? "Camión" : "Semirremolque"
            } ${
              yaVencio
                ? "Vencida"
                : `por Vencer en ${Math.ceil(
                    hastaVencimiento / (1000 * 60 * 60 * 24)
                  )} días`
            }`,
            datos: `${marca} ${modelo ? modelo : tipo}-${patente}`,
            fecha: { dia, mes, año },
            funcionVer: () => navegar("/tarjeta-ruta"),
          });
        });

        if (aux.length > 0) {
          aux.sort(({ fecha: a }, { fecha: b }) => {
            if (!a) return -1;
            else if (!b) return 1;
            return (
              new Date(a.año, a.mes - 1, a.dia).getTime() -
              new Date(b.año, b.mes - 1, b.dia).getTime()
            );
          });
          toast.warning("Tiene Notificaciones Pendientes", {
            position: "top-center",
            autoClose: 1500,
            draggable: true,
            progress: undefined,
            theme: "colored",
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            closeButton: false,
            bodyClassName: "toast_class",
            style: { backgroundColor: "#ae8c5c" },
          });
          dispatch_vencimientos({
            tipo: POBLAR_LISTA,
            payload: aux,
          });
        }
      })
      .catch((error) => console.log(error.message));
  };
  return poblarLista;
};

export default usePoblarLista;
