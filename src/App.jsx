import { useState, useEffect } from 'react'
import Formulario from './formulario'
import Tarea from './tarea'



function App() {

  let [tareas, setTareas] = useState([])

  useEffect(() => {
    fetch("https://back-mongodb.onrender.com/tareas")
      .then(respuesta => respuesta.json())
      .then(tareas => setTareas(tareas));
  }, [])

  function crearTarea(tarea) {
    setTareas([...tareas, tarea])
  }

  function borrarTarea(id) {
    setTareas(tareas.filter(tarea => tarea.id != id))
  }



  function actualizarEstado(id) {
    setTareas(tareas.map(tarea => {
      if (tarea.id == id) {
        tarea.estado = !tarea.estado
      }
      return tarea
    }))
  }

  function actualizarTexto(id, texto) {
    setTareas(tareas.map(tarea => {
      if (tarea.id == id) {
        tarea.tarea = texto
      }
      return tarea
    }))
  }


  return (
    <>
      <Formulario crearTarea={crearTarea} />
      <section className="tareas">
        {tareas.map(({ id, tarea, estado }) => <Tarea key={id} id={id}
          tarea={tarea} estado={estado} borrarTarea={borrarTarea} actualizarEstado={actualizarEstado} actualizarTexto={actualizarTexto} />)}
      </section>
    </>
  )
}

export default App
