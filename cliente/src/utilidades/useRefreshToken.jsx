import { useContextoGlobal } from "../Contexto";
import axios from "axios";

const useRefreshToken = () => {
  const { setAuth } = useContextoGlobal();

  const refresh = async () => {
    axios
      .get("http://localhost:8080/refresh", {
        withCredentials: true,
      })
      .then((res) => {
        setAuth(res.data.token);
        return res.data.token;
      })
      .catch((err) => {
        if (err.status === 401) {
          setAuth("");
          return "";
        }
      });
  };

  return refresh;
};

export default useRefreshToken;
