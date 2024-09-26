import Lateral from './componentes/Lateral'
import Barra_superior from './componentes/Barra_superior'


function App() {

  return (
    <div className='container'>
      <Barra_superior />
      <Lateral />

        <div className='cuerpo'>
          <h1>CUERPO</h1>
        </div>
    </div>
  )
}

export default App
