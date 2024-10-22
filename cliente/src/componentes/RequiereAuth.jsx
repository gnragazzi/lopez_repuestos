import { useLocation, Navigate } from "react-router-dom";
import App from "../App";
import { useContextoGlobal } from "../Contexto";

const RequiereAuth = () => {
  const { auth } = useContextoGlobal();

  const location = useLocation();

  return auth ? (
    <App />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequiereAuth;
