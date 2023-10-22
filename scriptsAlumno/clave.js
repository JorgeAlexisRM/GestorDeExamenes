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

    // Consultar la colección "examenes" en Firebase para obtener exámenes asociados a materiaId
    const examenesRef = firebase.firestore().collection("examenes").where("idMateria", "==", materiaId);

    examenesRef.get().then((querySnapshot) => {
        examenesDiv.innerHTML = ''; // Limpiar el div antes de agregar contenido nuevo

        querySnapshot.forEach((examDoc) => {
            const examData = examDoc.data();
            const examElement = `
                <div class="examen-card">
                    <h2>${examData.titulo}</h2>
                    <!-- Botón Ver con data-id y un id único -->
                    <button class="ver-btn" data-id="${examDoc.id}" id="verBtn_${examDoc.id}">Ver</button>
                </div>
            `;

            examenesDiv.innerHTML += examElement;

            // Ahora, añade un oyente de eventos para el botón que acabas de agregar
            document.getElementById(`verBtn_${examDoc.id}`).addEventListener("click", function() {
                verExamen(examDoc.id, examData.titulo);
            });
        });
    }).catch((error) => {
        console.error("Error al obtener los exámenes: ", error);
    });
}





