import { useState } from 'react'



function Formulario({ crearTarea }) {

    let [textoInput, setTextoInput] = useState("");

    return (
        <form onSubmit={evento => {
            evento.preventDefault()

            if (textoInput.trim() != "") {

                let tarea = textoInput.trim()

                fetch("https://back-mongodb.onrender.com/tareas/nueva", {
                    method: "POST",
                    body: JSON.stringify({ tarea }),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                    .then(respuesta => respuesta.json())
                    .then(({ id, error }) => {
                        if (!error) {
                            crearTarea({ id, tarea, estado: false })
                            return setTextoInput("")
                        }

                        console.log("..mostrar error al usuario");
                    });
            }



        }}>
            <input type="text" placeholder="¿que hay que hacer?" value={textoInput} onChange={evento => setTextoInput(evento.target.value)
            } />
            <input type="submit" value="crear tarea" />
        </form >
    )
}

export default Formulario
