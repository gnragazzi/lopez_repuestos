import { useContextoGlobal } from "../Contexto";
import axios from "axios";

const useRefreshToken = () => {
  const { setAuth } = useContextoGlobal();

  const refresh = async () => {
    const response = await axios.get("http://localhost:8080/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.token);
      return { ...prev, token_acceso: response.data.token };
    });
    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
