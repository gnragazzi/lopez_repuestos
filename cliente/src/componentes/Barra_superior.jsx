import icono_lopez from "../assets/iconos_lopez/icono_empresa.png";



function Barra_superior() {
  return (
    <div className="header__barra_superior">
      <div className="barra_superior__icono_superior">
        <img src={icono_lopez} alt="Icono de la empresa" />
      </div>
      <h1>Barra_superior</h1>
    </div>
  );
}

export default Barra_superior;
