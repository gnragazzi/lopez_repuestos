import { useNavigate } from "react-router-dom";
import { useContextoGlobal } from "../../Contexto";
import Seguro_1 from "./Seguro_1";
import Seguro_2 from "./Seguro_2";
import Listar_seguro from "./Listar_seguro";
import { useEffect, useState } from "react";
import useAxiosPrivado from "../../utilidades/useAxiosPrivado";
import { MdReportGmailerrorred } from "react-icons/md";
import { Bounce, toast } from "react-toastify";
import { AiOutlineFileProtect } from "react-icons/ai";

const Cargar_seguro = () => {
  const navegar = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const axiosPrivado = useAxiosPrivado();
  const {
    acciones_seguro: acciones,
    dispatch_seguro: dispatch,
    estado_seguro: estado,
  } = useContextoGlobal();
  const {
    PROXIMA_PAGINA_SEGURO,
    ANTERIOR_PAGINA_SEGURO,
    RESETEAR_ESTADO,
  } = acciones;
  const { pagina_seguro } = estado;


  const [aseguradoraInvalida, setAseguradoraInvalida] = useState("");
  const [tipoInvalida, setTipoInvalida] = useState("");
  const [pagoInvalido, setPagoInvalido] = useState("");

  const regex = /[^\w|\s|áéíóú|,]/i;

  const validarCampos =()=>{
    let esValido = true;
    if(estado.tipo.trim() === ""){
      setTipoInvalida(
      <MdReportGmailerrorred title="El tipo no puede estar vacía"/>);
      esValido=false;
    }else 
      if (regex.test(estado.tipo)) {
        setTipoInvalida(<MdReportGmailerrorred title= "El tipo solo puede contener letras, números, espacios, acentos y comas"/>);
        esValido=false;
    }else setTipoInvalida("");

    if (estado.nombre_aseguradora.trim() === "") {
      setAseguradoraInvalida(
        <MdReportGmailerrorred title="La ubicación no puede estar vacía"/>
      );
      esValido=false;
    }else 
      if (regex.test(estado.nombre_aseguradora)) {
        setAseguradoraInvalida(<MdReportGmailerrorred title= "La ubicación solo puede contener letras, números, espacios, acentos y comas"/>);
        esValido=false;
    }else setAseguradoraInvalida("");

    if (estado.pago.trim() == "") {
      setPagoInvalido(
        <MdReportGmailerrorred title="El pago no puede estar vacío"/>
      );
      esValido=false;
    }else 
      if (estado.pago < 0) {
        setPagoInvalido(<MdReportGmailerrorred title= "El pago no puede ser negativo. Ingrese un valor valido."/>);
        esValido=false;
    }else setPagoInvalido("");

    const emision = new Date(estado.fecha_emision);
    const vencimiento = new Date(estado.fecha_vencimiento);
  
    if (vencimiento < emision) {
      esValido=false;
    }

    return esValido;
  }


  const enviarFormulario = () => {
    setError("");
    setCargando(true);
    axiosPrivado
      .post("/seguro", estado)
      .then(() => {
        setCargando(false);
        toast.success(" Seguro Cargado Correctamente", {
          position: "top-center",
          autoClose: 3000,
          draggable: true,
          progress: undefined,
          theme: "colored",
          icon: <AiOutlineFileProtect size={24}/>,
          transition: Bounce,
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


  return (
    <>
      <div className="App formulario">
        {/* PÁGINAS */}
        {pagina_seguro == 0 && <Listar_seguro/>}
        {pagina_seguro == 1 && <Seguro_1 
        aseguradoraInvalida={aseguradoraInvalida} setAseguradoraInvalida={setAseguradoraInvalida}
        tipoInvalida={tipoInvalida} setTipoInvalida={setTipoInvalida}
        pagoInvalido={pagoInvalido} setPagoInvalido={setPagoInvalido}/>}
        {pagina_seguro == 2 && <Seguro_2/>}


        {/* BOTONERA */}
        <div className="botonera_formulario">
          {pagina_seguro == 1 && (
            <button
              className="formulario__boton volver"
              onClick={() => {
                dispatch({ type: RESETEAR_ESTADO });
                navegar("../");
              }}
            >
              Cancelar
            </button>
          )}
          {pagina_seguro == 0 && (
            <button
              className="formulario__boton volver"
              onClick={() => {
                dispatch({ type: RESETEAR_ESTADO });
                navegar("../");
              }}
            >
              Cancelar
            </button>
          )}
          {pagina_seguro == 2 && (
            <button
              className="formulario__boton volver"
              onClick={() =>
                dispatch({
                  type: ANTERIOR_PAGINA_SEGURO,
                  payload: {
                    /* acá iría el arreglo de comprobación*/
                  },
                })
              }
            >
              Volver
            </button>
          )}
          {pagina_seguro == 1 && (
            <button
              className="formulario__boton siguiente"
              onClick={() => {
                if(validarCampos()){
                  dispatch({ type: PROXIMA_PAGINA_SEGURO });
                }
              }}
            >
              Siguiente
            </button>
          )}
          {pagina_seguro == 2 && (
            <button
              className="formulario__boton siguiente"
              onClick={() => {
                console.log(estado);
                enviarFormulario();
                dispatch({ type: RESETEAR_ESTADO });
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

export default Cargar_seguro;
