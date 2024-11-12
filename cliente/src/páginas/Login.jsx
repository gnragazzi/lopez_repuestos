import axios from "axios";
import { useContextoGlobal } from "../Contexto";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import lopez from "../assets/iconos_lopez/icono_empresa.png";
import { FaTree } from "react-icons/fa";
import camion from "../assets/iconos_lateral/camion.gif";
import { GiGrass } from "react-icons/gi";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { auth, setAuth } = useContextoGlobal();
  const navegar = useNavigate();
  const localizacion = useLocation();
  const from = localizacion.state?.from?.pathname || "/";
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const manejarLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/auth",
        { usuario, contrasena },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        const { token } = res.data;
        //sessionStorage.setItem("jwt", token);
        setAuth(token);
        navegar(from, { replace: true });
      })
      .catch(() => {
        const error =
          usuario == ""
            ? "Ingrese un nombre de usuario"
            : contrasena == ""
            ? "Ingrese una contaseña"
            : "Nombre de Usuario y/o Contraseña Incorrecto";
        toast.error(error, {
          position: "top-center",
          autoClose: 3000,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          icon: false,
          closeButton: false,
          bodyClassName: "toast_class",
          style: { textAlign: "center" },
        });
      });
  };
  if (!auth)
    return (
      <div className="contenedorlogin">
        <button
          onClick={() =>
            axios
              .get("http://localhost:8080/clear")
              .then((res) => console.log(res))
          }
        >
          clear
        </button>
        <ToastContainer />
        <div className="login">
          <div className="login__descripcion"></div>
          <div className="login__formulario">
            <div className="icono__formulario">
              <img src={lopez} alt="icono de la empresa" />
            </div>
            <h2>Login</h2>
            <div className="formulario__input">
              <form action="">
                <fieldset>
                  <legend>Usuario</legend>
                  <input
                    type="text"
                    name="usuario"
                    id="usuario"
                    placeholder="admin"
                    value={usuario}
                    onChange={(e) => {
                      setUsuario(e.target.value);
                    }}
                  />
                </fieldset>

                <fieldset>
                  <legend>Contraseña</legend>
                  <input
                    type="password"
                    name="contrasena"
                    id="contrasena"
                    placeholder="1234"
                    value={contrasena}
                    onChange={(e) => {
                      setContrasena(e.target.value);
                    }}
                  />
                </fieldset>

                <button onClick={manejarLogin}>Iniciar Sesión</button>

                <a href="#">¿Has olvidado la contraseña?</a>
              </form>
            </div>
            <div className="contenedor__camion">
              <div className="camion__imagen">
                <img src={camion} className="camion" />
                <div className="contenedor__arboles">
                  <FaTree className="arboles" />
                  <FaTree className="arboles" />
                </div>
              </div>
              <div className="contenedor__pasto">
                {Array.from({ length: 120 }).map((_, index) => (
                  <GiGrass key={index} className="pasto" />
                ))}
              </div>
              <div className="camion__piso">a</div>
            </div>
          </div>
        </div>
      </div>
    );
  else return <Navigate to={"/"} state={{ from: localizacion }} replace />;
};

export default Login;
