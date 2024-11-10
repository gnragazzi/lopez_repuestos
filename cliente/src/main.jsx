import { createRoot } from "react-dom/client";
//import App from "./App.jsx";
import "./index.css";
import Contexto from "./Contexto.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Principal from "./páginas/Principal";
import Mantenimiento from "./páginas/Mantenimiento.jsx";
import Viajes from "./páginas/cargar_viaje/Viajes.jsx";
import CargarMantenimiento from "./páginas/mantenimiento/CargarMantenimiento.jsx";
import { Cargar_viaje } from "./páginas/cargar_viaje/Cargar_viaje.jsx";
import Camiones from "./páginas/Camion.jsx";
import Chofer from "./páginas/chofer/Chofer.jsx";
import Costos_camión from "./páginas/costos_camion/Costos_camión.jsx";
import EnConstrucción from "./componentes/EnConstrucción.jsx";
import Login from "./páginas/Login.jsx";
import RequiereAuth from "./componentes/RequiereAuth.jsx";
import Entregas_tardias from "./páginas/ver_entregas_tardias/Entregas_tardias.jsx";
import Chofer_manejador from "./páginas/chofer/Chofer_manejador.jsx";

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
            children: [
              {
                path: "",
                element: <Chofer />,
              },
              {
                path: "editar",
                element: <Chofer_manejador />,
              },
              {
                path: "nuevo",
                element: <Chofer_manejador />,
              },
            ],
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
            ],
          },
          {
            path: "semirremolques",
            element: <EnConstrucción titulo={"Semirremolques"} />,
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
