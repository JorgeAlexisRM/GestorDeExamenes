// Función para inscribir al alumno en una materia usando la clave
function inscribirMateriaPorClave() {
    const claveMateria = document.getElementById("Clave").value; // Obtener la clave ingresada

    // Buscar materia en Firebase usando la clave
    const materiaRef = firebase.firestore().collection("materias").doc(claveMateria);

    materiaRef.get().then((doc) => {
        if (doc.exists) {
            // Si la materia existe, inscribimos al alumno en esa materia
            const userId = firebase.auth().currentUser.uid; // Obtener el ID del usuario actual (alumno)
            const userRef = firebase.firestore().collection("usuarios").doc(userId);
            
            userRef.update({
                materiasInscritas: firebase.firestore.FieldValue.arrayUnion(claveMateria)
            }).then(() => {
                alert("Has sido inscrito en la materia exitosamente.");
                // Aquí puedes llamar a otra función para actualizar la lista de materias en la interfaz

                 // Llamamos a la función para actualizar la lista de materias inscritas
                mostrarMateriasInscritas();

            }).catch((error) => {
                console.error("Error al inscribir en la materia: ", error);
            });

        } else {
            alert("La clave de la materia no es válida o la materia no existe.");
        }
    }).catch((error) => {
        console.error("Error al obtener la materia: ", error);
    }); 
}

// Función para mostrar las materias inscritas del alumno
function mostrarMateriasInscritas() {
    const user = firebase.auth().currentUser; // Obtener el ID del usuario actual (alumno)
    if (!user) return;

    const userId = user.uid;
    const userRef = firebase.firestore().collection("usuarios").doc(userId);
    userRef.get().then((doc) => {
        if (doc.exists && doc.data().materiasInscritas) {
            const materiasInscritas = doc.data().materiasInscritas;
            
            // Limpiar el div de listaMaterias antes de agregar contenido nuevo
            const listaMateriasDiv = document.getElementById("listaMaterias");
            listaMateriasDiv.innerHTML = '';

            materiasInscritas.forEach(materiaId => {
                const materiaRef = firebase.firestore().collection("materias").doc(materiaId);
                
                materiaRef.get().then((materiaDoc) => {
                    if (materiaDoc.exists) {
                        // Aquí generamos el HTML para cada materia
                        const materiaData = materiaDoc.data();
                        const materiaElement = `
                            <div class="materia-card" data-id="${materiaId}" onclick="mostrarExamenes('${materiaId}')">
                                <h2>${materiaData.nombre}</h2>
                               
                            </div>
                        `;
                        listaMateriasDiv.innerHTML += materiaElement;
                    }
                }).catch((error) => {
                    console.error("Error al obtener la materia: ", error);
                });
            });
        }
    }).catch((error) => {
        console.error("Error al obtener las materias inscritas del alumno: ", error);
    });
    document.getElementById("divParaExamenes").style.display = 'none';
}

//mostrar examens
function mostrarExamenes(materiaId) {
    // Ocultar el contenedor de tarjetas de materias
    document.getElementById("listaMaterias").style.display = 'none';

    // Mostrar el contenedor de tarjetas de exámenes
    const examenesDiv = document.getElementById("divParaExamenes");
    examenesDiv.style.display = 'block';

    const userId = firebase.auth().currentUser.uid;

    // Consulta las calificaciones del estudiante
    const calificacionesRef = firebase.firestore().collection("calificaciones").where("alumnoId", "==", userId);

    calificacionesRef.get().then((calificacionesSnapshot) => {
        const examenesRealizados = calificacionesSnapshot.docs.map(doc => doc.data().examenId);

        // Consultar la colección "examenes" en Firebase
        const examenesRef = firebase.firestore().collection("examenes").where("idMateria", "==", materiaId);

        examenesRef.get().then((querySnapshot) => {
            examenesDiv.innerHTML = ''; 

            querySnapshot.forEach((examDoc) => {
                const examData = examDoc.data();
                let examElement;

                if (examenesRealizados.includes(examDoc.id)) {
                    // Si el estudiante ya realizó el examen, muestra la calificación
                    const calificacion = calificacionesSnapshot.docs.find(doc => doc.data().examenId === examDoc.id).data().calificacion;
                    examElement = `
                        <div class="examen-card" data-id="${examDoc.id}">
                            <h2>${examData.titulo}</h2>
                            <p>Tu calificación: ${calificacion}</p>
                        </div>
                    `;
                } else {

                    // Si no, muestra el botón "Realizar Examen"
                    examElement = `
                    <div class="examen-card" data-id="${examDoc.id}">
                        <h2>${examData.titulo}</h2>
                        <button class="ver-btn" data-id="${examDoc.id}" id="verBtn_${examDoc.id}" onclick="console.log('Botón presionado');">Realizar Examen</button>
                    </div>
                    `;
                }

                examenesDiv.innerHTML += examElement;

                // Si el botón "Realizar Examen" existe, añade un oyente de eventos
                if (!examenesRealizados.includes(examDoc.id)) {
                    document.getElementById(`verBtn_${examDoc.id}`).addEventListener("click", function() {
                        verExamen(examDoc.id, examData.titulo);
                    });
                }
            });
        }).catch((error) => {
            console.error("Error al obtener los exámenes: ", error);
        });

    }).catch((error) => {
        console.error("Error al obtener las calificaciones del estudiante: ", error);
    });
}