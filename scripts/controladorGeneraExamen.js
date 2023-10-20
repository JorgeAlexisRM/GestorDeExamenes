
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
                <textarea class="question" required> </textarea><br>

                <label for="options">Opciones de Respuesta:</label><br>
                <div id="optionsContainer_${contador}" class="option-container">
                    <div class="option">
                        <label for="option1">Opción 1:</label>
                        <input type="text" name="option" required>
                        <input type="radio" name="correct" value="A" id="opcionA${contador}">
                    </div>
                    <div class="option2">
                        <label for="option2">Opción 2:</label>
                        <input type="text" name="option" required>
                        <input type="radio" name="correct" value="B" id="opcionB${contador}">
                    </div>
                    <div class="option3">
                        <label for="option1">Opción 3:</label>
                        <input type="text" name="option" required>
                        <input type="radio" name="correct" value="C" id="opcionC${contador}">
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
        questionCounter--;
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
        contenidoExamen.style.marginLeft='250px';
        conte.style.marginLeft='-30px';
    } else {
        menu.style.left = '-250px';
        mainContent.style.marginLeft = '0';
        contenidoExamen.style.marginLeft='50px';
    }
});


function muestraExamenes() {
  
    const muestra = document.getElementById('contenedorAccciones');
    const muestr = document.getElementById('contenedorExamenes');
    const contenedorAgregaMateria = document.getElementById('contMateria');
    const materia = document.getElementById('materia');
    materia.style.display='none';
    contenedorAgregaMateria.style.display='none';
    muestr.style.display = 'grid';
    muestra.style.display = 'none';
}

function muestraCreaExamen() {
    
    const muestra = document.getElementById('contenedorAccciones');
    const muestr = document.getElementById('contenedorExamenes');
    const contenedorAgregaMateria = document.getElementById('contMateria');
    const materia = document.getElementById('materia');
    materia.style.display='none';
    contenedorAgregaMateria.style.display='none';
    muestr.style.display = 'none';
    document.body.display='flex';
    document.body.flexdirection='column';
    muestra.style.display='flex';
}

function verAgregarMateria() {
    const muestra = document.getElementById('contenedorAccciones');
    const muestr = document.getElementById('contenedorExamenes');
    const contenedorAgregaMateria = document.getElementById('contMateria');
    const materia = document.getElementById('materia');
    materia.style.display='none';
    muestr.style.display = 'none';
    document.body.display='none';
    muestra.style.display='none';
    contenedorAgregaMateria.style.display='inline';
}

function muestraMaterias(){
    const muestra = document.getElementById('contenedorAccciones');
    const muestr = document.getElementById('contenedorExamenes');
    const contenedorAgregaMateria = document.getElementById('contMateria');
    const materia = document.getElementById('materia');
    materia.style.display='grid';
    muestr.style.display = 'none';
    document.body.display='none';
    muestra.style.display='none';
    contenedorAgregaMateria.style.display='none';
}
