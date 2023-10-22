
var questionsContainer = document.getElementById("questionsContainer");
var saveQuestionsButton = document.getElementById("saveQuestions");

var contador = 0;

function generaPregunta() {
    contador++;

    const newQuestionForm = creaPregunta(contador);
    questionsContainer.appendChild(newQuestionForm);

    // Agrega la clase "bordered" inmediatamente después de agregar la pregunta
    questionsContainer.classList.add("bordered");
};

function creaPregunta(contador) {

    const questionForm = document.createElement("form");
    questionForm.id = `questionForm_${contador}`;

    questionForm.innerHTML = `
                <label for="question" id="pre">Pregunta:</label>
                <textarea class="question" id="pre_${contador}" required> </textarea><br>

                <label for="options">Opciones de Respuesta:</label><br>
                <div id="optionsContainer_${contador}" class="option-container">
                    <div class="option">
                        <label for="option1">Opción 1:</label>
                        <input type="text" id="optionA_${contador}" required>
                        <input type="radio" name="correct_${contador}" value="A" id="opcionA${contador}">
                    </div>
                    <div class="option2">
                        <label for="option2">Opción 2:</label>
                        <input type="text" id="optionB_${contador}" required>
                        <input type="radio" name="correct_${contador}" value="B" id="opcionB${contador}">
                    </div>
                    <div class="option3">
                        <label for="option1">Opción 3:</label>
                        <input type="text" id="optionC_${contador}" required>
                        <input type="radio" name="correct_${contador}" value="C" id="opcionC${contador}">
                    </div>
                </div>
                <button type="button" class="removeQuestion red-button" onclick="remover()">Eliminar Pregunta</button>
            <br><br>
            `;

    return questionForm;
}

function remover() {
    const target = event.target;

    if (target.classList.contains("removeQuestion")) {
        const questionForm = target.closest("form");
        questionForm.remove();
    }
};

/*------------------*/
document.getElementById('menuToggle').addEventListener('change', function () {
    const menu = document.getElementById('menu');
    const mainContent = document.getElementById('contenedor');
    const contenidoExamen = document.getElementById('infoExam');
    const conte = document.getElementById('contenidoExamenes');

    if (this.checked) {
        menu.style.left = '0';
        mainContent.style.marginLeft = '250px';
        contenidoExamen.style.marginLeft = '250px';
        conte.style.marginLeft = '-30px';
    } else {
        menu.style.left = '-250px';
        mainContent.style.marginLeft = '0';
        contenidoExamen.style.marginLeft = '50px';
    }
});


function muestraExamenes() {

    const muestra = document.getElementById('contenedorAccciones');
    const muestr = document.getElementById('contenedorExamenes');
    const contenedorAgregaMateria = document.getElementById('contMateria');
    const materia = document.getElementById('materia');
    const saludo = document.getElementById('saludoUser');
    /*haciendo que no se visualice el examen*/
    var examen = document.getElementById('examen');
    examen.innerHTML = "";
    /*--------*/
    materia.style.display = 'none';
    contenedorAgregaMateria.style.display = 'none';
    muestr.style.display = 'grid';
    muestra.style.display = 'none';
    saludo.style.display = 'none';

    verExamenes();

}

function muestraCreaExamen() {

    const muestra = document.getElementById('contenedorAccciones');
    const muestr = document.getElementById('contenedorExamenes');
    const contenedorAgregaMateria = document.getElementById('contMateria');
    const materia = document.getElementById('materia');
    const saludo = document.getElementById('saludoUser');
    /*haciendo que no se visualice el examen*/
    var examen = document.getElementById('examen');
    examen.innerHTML = "";
    /*--------*/
    materia.style.display = 'none';
    contenedorAgregaMateria.style.display = 'none';
    muestr.style.display = 'none';
    document.body.display = 'flex';
    document.body.flexdirection = 'column';
    muestra.style.display = 'flex';
    saludo.style.display = 'none';

    materiaList();
}

function verAgregarMateria() {
    const muestra = document.getElementById('contenedorAccciones');
    const muestr = document.getElementById('contenedorExamenes');
    const contenedorAgregaMateria = document.getElementById('contMateria');
    const materia = document.getElementById('materia');
    const saludo = document.getElementById('saludoUser');
    /*haciendo que no se visualice el examen*/
    var examen = document.getElementById('examen');
    examen.innerHTML = "";
    /*--------*/
    materia.style.display = 'none';
    muestr.style.display = 'none';
    document.body.display = 'none';
    muestra.style.display = 'none';
    saludo.style.display = 'none';
    contenedorAgregaMateria.style.display = 'inline';
}

function muestraMaterias() {
    const muestra = document.getElementById('contenedorAccciones');
    const muestr = document.getElementById('contenedorExamenes');
    const contenedorAgregaMateria = document.getElementById('contMateria');
    const materia = document.getElementById('materia');
    const saludo = document.getElementById('saludoUser');
    /*haciendo que no se visualice el examen*/
    var examen = document.getElementById('examen');
    examen.innerHTML = "";
    /*--------*/
    materia.style.display = 'grid';
    muestr.style.display = 'none';
    document.body.display = 'none';
    muestra.style.display = 'none';
    saludo.style.display = 'none';
    contenedorAgregaMateria.style.display = 'none';

    verMaterias();
}

//Controladores de Usuario
// Recupera la cadena JSON del localStorage
var usuarioSerializado = localStorage.getItem('usuario');

// Deserializa la cadena JSON a un objeto JavaScript
var usuario = JSON.parse(usuarioSerializado);

var tituloLogin = document.getElementById('usuario');
var saludo = document.getElementById('saludoUser');
nombreUsuario(usuario.id);

// Encuentra el nombre de Usuario
function nombreUsuario(uidUser) {
    const docRef = db.collection("usuarios").doc(uidUser);
    //Solicitamos los datos del documento referido
    docRef.get().then((doc) => {
        console.log(doc.data());
        tituloLogin.innerHTML = doc.data().name;
        saludo.innerHTML = "Bienvenido" + doc.data().name;
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "*/*" + errorMessage);
    });
}

function agregarMateria() {
    var materia = document.getElementById('nameMateria').value;
    var mat = document.getElementById('nameMateria');
    if (materia != "") {
        db.collection("materias").add({
            idMaestro: usuario.id,
            nombre: materia
        })
            .then((docRef) => {
                alert("Materia Guardada exitosamente");
                console.log("Document written with ID: ", docRef.id);
                mat.value = "";
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    } else {
        alert("debes de llenar los campos")
    }
}

function verMaterias() {
    var contenedor = document.getElementById('materia');
    var tarjetaMateria = "";

    db.collection("materias").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const aux = `${doc.data().idMaestro}`;

            if (aux === usuario.id) {
                console.log(doc);
                tarjetaMateria = tarjetaMateria +
                    "<div class='infoExam'>" +
                    "<h1 class='materiaNom' id='nomMateria'>" + doc.data().nombre + "</h1>" +
                    "<h2>" + doc.id + "</h2>" +
                    "<button class='button-r button-a' onclick='eliminarMateria(\"" + doc.id + "\")'>Eliminar</button>" +
                    "</div>";

                contenedor.innerHTML = tarjetaMateria;
            }
        });
    });

}

function materiaList() {
    var listaMaterias = document.getElementById('listMateria');
    var opcion = "";
    db.collection("materias").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const aux = `${doc.data().idMaestro}`;
            if (aux === usuario.id) {
                console.log(doc);
                opcion += "<option value='"
                    + doc.id + "'>" + doc.data().nombre + "</option>";
                listaMaterias.innerHTML = opcion;
            }
        });
    });
}

function guardarExamen() {
    const materia = document.getElementById('materiasList').value;
    const titulo = document.getElementById('tituloExamen').value;

    db.collection("examenes").add({
        idMaestro: usuario.id,
        idMateria: materia,
        titulo: titulo
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            for (i = 1; i <= contador; i++) {
                let pregunta = document.getElementById('pre_' + i).value;
                let opcionA = document.getElementById('optionA_' + i).value;
                let opcionB = document.getElementById('optionB_' + i).value;
                let opcionC = document.getElementById('optionC_' + i).value;
                let respuesta = document.querySelector('input[name="correct_' + i + '"]:checked').value;

                db.collection("preguntas").add({
                    A: opcionA,
                    B: opcionB,
                    C: opcionC,
                    idExamen: docRef.id,
                    pregunta: pregunta,
                    respuesta: respuesta
                })
                    .then((doc1Ref) => {
                        console.log("Document written with ID: ", doc1Ref.id);

                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            }
            questionsContainer.innerHTML =
                `<label for="materiasList">Materia: </label>
                <input list="listMateria" id="materiasList" class="nomMateria"><br>
                <datalist id="listMateria"></datalist>
                <label for="tituloExamen">Titulo: </label>
                <input type="text" id="tituloExamen">
                <h1>Crear Cuestionario</h1>
                <form id="formula"></form>`;;

            alert("Guardado exitosamente");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

function verExamenes() {

    var contenedor = document.getElementById('contenedorExamenes');
    var tarjetaExamen = "";

    db.collection("examenes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const aux = `${doc.data().idMaestro}`;

            if (aux === usuario.id) {
                console.log(doc);
                nombreMateria(doc.data().idMateria).then((nombreMateriaValue) => {
                    let id = doc.id;
                    let titulo = doc.data().titulo;
                    tarjetaExamen = tarjetaExamen +
                        "<div class='infoExam'>" +
                        "<h1 id='tituloExam'>" + doc.data().titulo + "</h1>" +
                        "<h4 id='MateriaExam'>" + nombreMateriaValue + "</h4>" +
                        "<div class='botonesExamen'>" +
                        '<button class="button-r" onclick="verExamen(\'' + id + '\',\'' + titulo + '\')">Ver</button>' +
                        '<button class="button-r button-a" onclick="eliminarExamen(\'' + id + '\')">Eliminar</button>' +
                        '</div>' +
                        '</div>';
                    contenedor.innerHTML = tarjetaExamen;
                }).catch((error) => {
                    console.error("Error al obtener el nombre de la materia:", error);
                });
            }
        });
    });
}

function nombreMateria(idMateria) {
    const materiaRef = db.collection("materias").doc(idMateria);
    return materiaRef.get().then((materiaDoc) => {
        if (materiaDoc.exists) {
            return materiaDoc.data().nombre;
        } else {
            return "Nombre no encontrado";
        }
    }).catch((error) => {
        console.error("Error al obtener la materia:", error);
        throw error;
    });
}

function verExamen(id, titulo) {
    const muestr = document.getElementById('contenedorExamenes');
    muestr.style.display = 'none';

    var examen = document.getElementById('examen');
    var datos = "<h1>" + titulo + "</h1><br>";
    examen.innerHTML = datos;

    db.collection("preguntas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const aux = `${doc.data().idExamen}`;
            if (aux === id) {
                console.log(doc);
                datos = datos +
                    '<label for="question" id="pre">' + doc.data().pregunta + '</label><br>' +
                    '<label for="options">Opciones de Respuesta:</label><br>' +
                    '<div id="optionsContainer_' + doc.id + '" class="option-container">' +
                    '<div class="option">' +
                    '<label for="option1">' + doc.data().A + '</label>' +
                    '<input type="radio" name="correct_${doc.id}" value="A" id="opcionA${doc.id}">' +
                    '</div>' +
                    '<div class="option2">' +
                    '<label for="option2">' + doc.data().B + '</label>' +
                    '<input type="radio" name="correct_${doc.id}" value="B" id="opcionB${doc.id}">' +
                    '</div>' +
                    '<div class="option3">' +
                    '<label for="option1">' + doc.data().C + '</label>' +
                    '<input type="radio" name="correct_${doc.id}" value="C" id="opcionC${doc.id}">' +
                    '</div>' +
                    '</div>' +
                    '<br><br>';
                examen.innerHTML = datos;
            }
        });
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "*/*" + errorMessage);
    });
}

function eliminarExamen(idExamen) {

    db.collection("preguntas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const aux = `${doc.data().idExamen}`;
            if (aux === idExamen) {
                db.collection("preguntas").doc(doc.id).delete().then(() => {
                    console.log("Pregunta eliminada")
                }).catch((error) => {
                    // Manejo de errores
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + "*/*" + errorMessage);
                });
            }
        });
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "*/*" + errorMessage);
    });

    db.collection("examenes").doc(idExamen).delete().then(() => {
        alert("Examen borrado");
    }).catch((error) => {
        // Manejo de errores
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "*/*" + errorMessage);
    });
}

function eliminarMateria(idMateria) {
    db.collection("examenes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const aux = `${doc.data().idMateria}`;
            if (aux === idMateria) {
                db.collection("preguntas").get().then((querySnapshot) => {
                    querySnapshot.forEach((docE) => {
                        const aux = `${docE.data().idExamen}`;
                        if (aux === doc.id) {
                            db.collection("preguntas").doc(docE.id).delete().then(() => {
                                console.log("Pregunta eliminada")
                            }).catch((error) => {
                                // Manejo de errores
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                console.log(errorCode + "*/*" + errorMessage);
                            });
                        }
                    });
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + "*/*" + errorMessage);
                });

                db.collection("examenes").doc(doc.id).delete().then(() => {
                    alert("Examen borrado");
                }).catch((error) => {
                    // Manejo de errores
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + "*/*" + errorMessage);
                });
            }
        });
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "*/*" + errorMessage);
    });

    db.collection("materias").doc(idMateria).delete().then(() => {
        alert("Materia borrada");
    }).catch((error) => {
        // Manejo de errores
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "*/*" + errorMessage);
    });

}

function cerrarSesion() {
    // Cerrar sesión en Firebase Authentication
    firebase.auth().signOut().then(function () {
        // Cierre de sesión exitoso
        alert("Nos vemos pronto..." + usuario.name);
        window.location.href = "login.html";
    }).catch(function (error) {
        // Manejo de errores
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "*/*" + errorMessage);
    });
}