import React from 'react'

function Lateral() {
  const categorias = [
    "principal",
    "viajes",
    "empleados",
    "vehículos",
    "mantenimiento"
  ]
  return (
    <div className='lateral'>
      <ul>
        {categorias.map((categoría)=>{
          return <li key={categoría}><p>{categoría}</p></li>
        })}
      </ul>
    </div>
  )
}

export default Lateral