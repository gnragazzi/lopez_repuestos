import { Bounce, toast } from "react-toastify";

export const notificacion_exito = (mensaje) => {
  toast.success(mensaje, {
    position: "top-center",
    autoClose: 2000,
    draggable: true,
    theme: "light",
    transition: Bounce,
    icon: false,
    closeButton: false,
    style: { textAlign: "center" },
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    bodyClassName: "toast_class",
  });
};

export const notificacion_error = (mensaje) => {
  toast.error(mensaje, {
    position: "top-right",
    autoClose: 1500,
    draggable: true,
    theme: "light",
    icon: false,
    closeButton: false,
    bodyClassName: "toast_class",
    style: { textAlign: "center" },
    pauseOnHover: false,
    pauseOnFocusLoss: false,
  });
};

export const notificacion_no_implementado = () => {
  toast.error("Esta funcionalidad todavía no está implementada😅", {
    position: "top-right",
    autoClose: 1500,
    draggable: true,
    theme: "light",
    icon: false,
    closeButton: false,
    bodyClassName: "toast_class",
    style: { textAlign: "center" },
    pauseOnHover: false,
    pauseOnFocusLoss: false,
  });
};
