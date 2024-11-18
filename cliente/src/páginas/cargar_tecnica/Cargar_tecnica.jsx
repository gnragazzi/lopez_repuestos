import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextoGlobal } from "../../Contexto";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";
import Cargar_1 from "./Cargar_1";
import Cargar_2 from "./Cargar_2";
import Listar_tecnica from "./Listar_tenica";
import { MdReportGmailerrorred } from "react-icons/md";
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import { Bounce, toast } from "react-toastify";

const Cargar_tecnica = () => {
  const navegar = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const axiosPrivado = useAxiosPrivado();
  const {
    acciones_tecnica: acciones,
    dispatch_tecnica: dispatch,
    estado_tecnica: estado,
    dispatch_vencimientos,
    acciones_vencimientos: { ACTUALIZAR_LISTA_VENCIMIENTOS, SE_MODIFICO_LISTA },
  } = useContextoGlobal();
  const { PROXIMA_PAGINA_TECNICA, ANTERIOR_PAGINA_TECNICA, RESETEAR_ESTADO } =
    acciones;
  const { pagina_tecnica, fecha_vencimiento, idVencimiento, esCamion } = estado;
  const enviar_formulario = () => {
    setError("");
    setCargando(true);
    axiosPrivado
      .post("/tecnica", estado)
      .then(() => {
        setCargando(false);
        if (idVencimiento) {
          console.log(esCamion);
          dispatch_vencimientos({
            tipo: ACTUALIZAR_LISTA_VENCIMIENTOS,
            payload: {
              fecha_vencimiento: fecha_vencimiento.split("-"),
              idVencimiento,
              esCamion: esCamion == "camion" ? true : false,
              origen: "Técnica",
            },
          });
        } else {
          dispatch_vencimientos({ tipo: SE_MODIFICO_LISTA });
        }
        toast.success("Tecnica Cargada Correctamente", {
          position: "top-center",
          autoClose: 3000,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          icon: <PiFileMagnifyingGlassFill size={50} />,
          bodyClassName: "toast_class",
        });
      })
      .catch((error) => {
        setCargando(false);
        setError(error.message);
      });
    if (cargando) {
      return <h1>Cargando...</h1>;
    } else if (error) {
      return (
        <>
          <h1>{error}</h1>
        </>
      );
    }
  };

  const [ubicacionInvalida, setUbicacionInvalida] = useState("");

  const validarFechas = () => {
    const emision = new Date(estado.fecha_emision);
    const vencimiento = new Date(estado.fecha_vencimiento);

    if (vencimiento < emision) {
      return false;
    }
    return true;
  };

  const validarUbicacion = () => {
    const regex = /[^\w|\s|áéíóú|,]/i;
    if (estado.ubicacion.trim() === "") {
      setUbicacionInvalida(
        <MdReportGmailerrorred title="La ubicación no puede estar vacía" />
      );
      return false;
    }

    if (regex.test(estado.ubicacion)) {
      setUbicacionInvalida(
        <MdReportGmailerrorred title="La ubicación solo puede contener letras, números, espacios, acentos y comas" />
      );
      return false;
    }

    setUbicacionInvalida("");
    return true;
  };

  return (
    <>
      <div className="App formulario">
        {/* PÁGINAS */}
        {pagina_tecnica == 0 && <Listar_tecnica />}
        {pagina_tecnica == 1 && (
          <Cargar_1
            ubicacionInvalida={ubicacionInvalida}
            setUbicacionInvalida={setUbicacionInvalida}
          />
        )}
        {pagina_tecnica == 2 && <Cargar_2 />}

        {/* BOTONERA */}
        <div className="botonera_formulario">
          {pagina_tecnica == 0 && (
            <button
              className={"formulario__boton volver"}
              onClick={() => navegar(-1)}
            >
              Volver
            </button>
          )}
          {pagina_tecnica == 1 && (
            <button
              className={"formulario__boton volver"}
              onClick={() =>
                dispatch({
                  type: ANTERIOR_PAGINA_TECNICA,
                })
              }
            >
              Cancelar
            </button>
          )}
          {pagina_tecnica == 2 && (
            <button
              className={"formulario__boton volver"}
              onClick={() =>
                dispatch({
                  type: ANTERIOR_PAGINA_TECNICA,
                })
              }
            >
              Volver
            </button>
          )}
          {pagina_tecnica == 1 && (
            <button
              className="formulario__boton siguiente"
              onClick={() => {
                if (validarFechas() && validarUbicacion()) {
                  dispatch({ type: PROXIMA_PAGINA_TECNICA });
                }
              }}
            >
              Siguiente
            </button>
          )}
          {pagina_tecnica == 2 && (
            <button
              className="formulario__boton siguiente"
              onClick={() => {
                enviar_formulario();
                dispatch({
                  type: RESETEAR_ESTADO,
                });
                navegar("../");
              }}
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Cargar_tecnica;
