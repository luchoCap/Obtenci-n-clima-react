import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import Error from './components/Error'

function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const [consultar, guardarConsultar] = useState(false)
  const [resultado, guardarResultado] = useState({})
  const [error, guardarError] = useState(false)
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarApi = async () => {

      if (consultar) {
        //es http para desarrollo pero para build es https
        const url = ` https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${process.env.REACT_APP_API_CLIMA}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado)
        guardarConsultar(false)

        //detecta si hubo resultados correctos en la consulta

        if (resultado.cod === "404") {
          guardarError(true)
        } else {
          guardarError(false)
        }
      }

    }
    consultarApi()
    //eslint-disable-next-line
  }, [consultar])

  //Carga condicional de componentes
  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultado" />
  } else {
    componente = <Clima resultado={resultado} />
  }
  return (
    <Fragment>
      <Header
        titulo='Clima React'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar} />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>

  );
}

export default App;
