import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Contexto from "./Contexto.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Principal from "./páginas/Principal";
import Mantenimiento from "./páginas/Mantenimiento.jsx";
import Viajes from "./páginas/Viajes.jsx";
import { Formulario_Mantenimiento } from "./páginas/Formulario_Mantenimiento.jsx";
import { Cargar_viaje } from "./páginas/cargar_viaje/Cargar_viaje.jsx";
import Camiones from "./páginas/Camion.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "principal",
        element: <Principal />,
      },
      {
        path: "vehículos",
        children: [
          {
            path: "camiones",
            element: <Camiones />,
          },
        ],
      },
      {
        path: "mantenimiento",
        children: [
          {
            path: "",
            element: <Mantenimiento />,
          },
          {
            path: "cargar_mantenimiento",
            element: <Formulario_Mantenimiento />,
          },
        ],
      },
      {
        path: "viajes",
        children: [
          {
            path: "",
            element: <Viajes></Viajes>,
          },
          {
            path: "cargar_viaje",
            element: <Cargar_viaje></Cargar_viaje>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Contexto>
    <RouterProvider router={router}></RouterProvider>
  </Contexto>
);
