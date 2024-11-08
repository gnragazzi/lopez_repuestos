import { createRoot } from "react-dom/client";
//import App from "./App.jsx";
import "./index.css";
import Contexto from "./Contexto.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Principal from "./páginas/Principal";
import Mantenimiento from "./páginas/Mantenimiento.jsx";
import Viajes from "./páginas/Viajes.jsx";
import CargarMantenimiento from "./páginas/mantenimiento/CargarMantenimiento.jsx";
import { Cargar_viaje } from "./páginas/cargar_viaje/Cargar_viaje.jsx";
import Camiones from "./páginas/Camion.jsx";
import Semirremolques from "./páginas/Semirremolque.jsx"
import Costos_camión from "./páginas/costos_camion/Costos_camión.jsx";
import EnConstrucción from "./componentes/EnConstrucción.jsx";
import Login from "./páginas/Login.jsx";
import RequiereAuth from "./componentes/RequiereAuth.jsx";
import Entregas_tardias from "./páginas/ver_entregas_tardias/Entregas_tardias.jsx";
import Cargar_tecnica from "./páginas/cargar_tecnica/cargar_tecnica.jsx";
import Cargar_seguro from "./páginas/cargar_seguro/Cargar_seguro.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RequiereAuth />,
    children: [
      {
        index: true,
        path: "principal",
        element: <Principal />,
      },
      {
        path: "empleados",
        children: [
          {
            path: "choferes",
            element: <EnConstrucción titulo={"Choferes"} />,
          },
          {
            path: "mecánicos",
            element: <EnConstrucción titulo={"Mecánicos"} />,
          },
        ],
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
                path: "nuevo",
                element: <EnConstrucción titulo={"Cargar Camión"} />,
              },
              {
                path: "costos",
                element: <Costos_camión />,
              },
              {
                path: "tecnica",
                element: <Cargar_tecnica />,
              },
              {
                path: "seguro",
                element: <Cargar_seguro />
              }
            ],
          },
          {
            path: "semirremolques",
            children: [
              {
                path: "",
                element: <Semirremolques />,
              },
              {
                path: "nuevo",
                element: <EnConstrucción titulo={"Cargar semirremolque"} />,
              },
              {
                path: "tecnica",
                element: <Cargar_tecnica />,
              },
              {
                path: "seguro",
                element: <Cargar_seguro />
              }
            ]
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
          {
            path: "ver_entregas_tardias",
            element: <Entregas_tardias></Entregas_tardias>,
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
