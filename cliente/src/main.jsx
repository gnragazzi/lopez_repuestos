import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Contexto from "./Contexto.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Principal from "./páginas/Principal";
import Mantenimiento from "./páginas/Mantenimiento.jsx";
import Viajes from "./páginas/Viajes.jsx";
import CargarMantenimiento from "./páginas/mantenimiento/CargarMantenimiento.jsx";
import { Cargar_viaje } from "./páginas/cargar_viaje/Cargar_viaje.jsx";
import Camiones from "./páginas/Camion.jsx";
import Costos_camión from "./páginas/costos_camion/Costos_camión.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        path: "principal",
        element: <Principal />,
      },
      {
        path: "vehículos",
        children: [
          {
            path: "camiones",
            children: [
              {
                path: "",
                element: <Camiones />,
              },
              {
                path: "costos",
                element: <Costos_camión />,
              },
            ],
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
            element: <CargarMantenimiento />,
            // element: <MantenimientoFormulario />,
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
