import axios from "axios";
import { useContextoGlobal } from "../Contexto";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const Login = () => {
  const { auth, setAuth } = useContextoGlobal();
  const navegar = useNavigate();
  const localizacion = useLocation();
  const from = localizacion.state?.from?.pathname || "/";
  const manejarLogin = () => {
    axios
      .get("http://localhost:8080/auth", { withCredentials: true })
      .then((res) => {
        const { token } = res.data;
        //sessionStorage.setItem("jwt", token);
        setAuth(token);
        navegar(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };
  if (!auth)
    return (
      <div>
        <h1>Login</h1>
        <button onClick={manejarLogin}>Login</button>
      </div>
    );
  else return <Navigate to={"/"} state={{ from: localizacion }} replace />;
};

export default Login;
