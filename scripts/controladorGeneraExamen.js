
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
    materia.style.display = 'none';
    contenedorAgregaMateria.style.display = 'none';
    muestr.style.display = 'grid';
    muestra.style.display = 'none';
    saludo.style.display = 'none';
}

function muestraCreaExamen() {

    const muestra = document.getElementById('contenedorAccciones');
    const muestr = document.getElementById('contenedorExamenes');
    const contenedorAgregaMateria = document.getElementById('contMateria');
    const materia = document.getElementById('materia');
    const saludo = document.getElementById('saludoUser');
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

    db.collection("materias").add({
        idMaestro: usuario.id,
        nombre: materia
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

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
                    "<button class='button-r button-a' onclick=''>Eliminar</button>" +
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
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}
