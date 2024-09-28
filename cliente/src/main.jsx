import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Contexto from "./Contexto.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Principal from "./páginas/Principal";
import Mantenimiento from "./páginas/Mantenimiento.jsx";
import Viajes from "./páginas/Viajes.jsx";
import { Formulario_Mantenimiento } from "./páginas/Formulario_Mantenimiento.jsx";
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
        path: "mantenimiento",
        children: [
          {
            path: "",
            element: <Mantenimiento />,
          },
          {
            path: "nuevo",
            element: <Formulario_Mantenimiento />,
          },
        ],
      },
      {
        path: "viajes",
        element: <Viajes />,
      },
      {
        path: "viajes",
        element: <Viajes></Viajes>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Contexto>
      <RouterProvider router={router}></RouterProvider>
    </Contexto>
  </StrictMode>
);
