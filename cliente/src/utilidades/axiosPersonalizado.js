import axios from "axios";

const URL_BASE = "http://localhost:8080";

export const axiosPrivado = axios.create({
  baseURL: URL_BASE,
  headers: { "Content-Type": "application/json" },
});
