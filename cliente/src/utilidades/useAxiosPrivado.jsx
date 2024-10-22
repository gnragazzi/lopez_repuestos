import { axiosPrivado } from "./axiosPersonalizado";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useContextoGlobal } from "../Contexto";

const useAxiosPrivado = () => {
  const refresh = useRefreshToken();
  const { auth } = useContextoGlobal();

  useEffect(() => {
    const interceptorReq = axiosPrivado.interceptors.request.use(
      (config) => {
        if (!config?.headers?.Authorization) {
          config.headers.Authorization = `Bearer ${auth}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const interceptorRes = axiosPrivado.interceptors.response.use(
      (res) => res,
      async (error) => {
        const prevReq = error?.config;
        if (error?.response?.status === 403 && !prevReq?.sent) {
          prevReq.sent = true;
          const nuevoToken = await refresh();
          prevReq.headers["Authorization"] = `Bearer ${nuevoToken}`;
          return axiosPrivado(prevReq);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivado.interceptors.response.eject(interceptorRes);
      axiosPrivado.interceptors.request.eject(interceptorReq);
    };
  }, [auth, refresh]);
  return axiosPrivado;
};

export default useAxiosPrivado;
