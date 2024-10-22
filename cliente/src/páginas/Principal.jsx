import axios from "axios";
import { useEffect } from "react";

function Principal() {
  useEffect(() => {
    axios
      .get("http://localhost:8080/refresh", { withCredentials: true })
      .then((res) => console.log(res));
  }, []);
  return (
    <div>
      <h1 className="prueba">Principal</h1>
    </div>
  );
}

export default Principal;
