import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Contexto from "./Contexto.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Principal from "./páginas/Principal";
import Mantenimiento from "./páginas/Mantenimiento.jsx";
import Viajes from "./páginas/Viajes.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "principal",
        element: <Principal></Principal>,
      },
      {
        path: "mantenimiento",
        element: <Mantenimiento />,
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
