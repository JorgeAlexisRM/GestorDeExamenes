// Función para mostrar el examen al alumno y permitirle responder
function verExamen(id, titulo) {
    var examen = document.getElementById('examen');
    
    // Inicia la tarjeta aquí
    var datos = `<div class="examen-container">
                    <h1>${titulo}</h1><br>`;

    db.collection("preguntas").where("idExamen", "==", id).get().then((querySnapshot) => {
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            datos += `
                <label for="question" id="pre">${doc.data().pregunta}</label><br>
                <label for="options">Opciones de Respuesta:</label><br>
                <div id="optionsContainer_${doc.id}" class="option-container">
                    <div class="option">
                        <label for="option1">${doc.data().A}</label>
                        <input type="radio" name="answer_${doc.id}" value="A">
                    </div>
                    <div class="option2">
                        <label for="option2">${doc.data().B}</label>
                        <input type="radio" name="answer_${doc.id}" value="B">
                    </div>
                    <div class="option3">
                        <label for="option3">${doc.data().C}</label>
                        <input type="radio" name="answer_${doc.id}" value="C">
                    </div>
                </div><br><br>`;
        });

        // Agrega el botón y cierra la tarjeta aquí
        datos += `<button onclick="submitExamen('${id}')">Subir Examen</button>`;
        datos += `</div>`; // Esto cierra el div de examen-container

        examen.innerHTML = datos;

    }).catch((error) => {
        console.error("Error al obtener las preguntas del examen:", error);
    });
}


function submitExamen(examenId) {
    function calificarExamen() {
        let correctas = 0;
        let totalPreguntas = 0;
    
        db.collection("preguntas").where("idExamen", "==", examenId).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                totalPreguntas++;
                const respuestaAlumno = document.querySelector(`input[name="answer_${doc.id}"]:checked`).value;
                if (respuestaAlumno === doc.data().respuesta) {
                    correctas++;
                }
            });

            const calificacion = (correctas / totalPreguntas) * 100;
            alert("Tu calificación es: " + calificacion);
    
            // Guardar la calificación en Firebase
            const userId = firebase.auth().currentUser.uid;
            db.collection("calificaciones").add({
                alumnoId: userId,
                examenId: examenId,
                calificacion: calificacion
            }).then(() => {
                console.log("Calificación guardada exitosamente.");
            }).catch((error) => {
                console.error("Error al guardar la calificación:", error);
            });
    
        }).catch((error) => {
            console.log("Error al obtener las preguntas del examen para calificar:", error);
        });
    }
    
    calificarExamen(); // Llamamos a la función interna para calificar el examen.
}