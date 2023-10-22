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
                        // generamos el HTML para cada materia
                        const materiaData = materiaDoc.data();
                        const materiaElement = `
                            <div class="tarjetaMateria">
                                <h3>${materiaData.nombre}</h3>
                                <!-- Aquí puedes agregar más detalles de la materia si lo deseas -->
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
}

