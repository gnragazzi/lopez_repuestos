import { useContextoGlobal } from "../Contexto";
import axios from "axios";

const useRefreshToken = () => {
  const { setAuth } = useContextoGlobal();

  const refresh = async () => {
    const response = await axios.get("http://localhost:8080/refresh", {
      withCredentials: true,
    });
    setAuth(response.data.token);
    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
