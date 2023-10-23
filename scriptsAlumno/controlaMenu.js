function muestraRegistroClave() {
    const contenedorClaveMateria = document.getElementById('contenedorClaveMateria');
    const listaMateriasDiv = document.getElementById('listaMaterias');
    const examenesDiv = document.getElementById("divParaExamenes");
    const examen = document.getElementById('examen');  // Obtiene el contenedor del examen
    
    contenedorClaveMateria.style.display = 'block';
    listaMateriasDiv.style.display = 'none';
    examenesDiv.style.display = 'none';
    examen.style.display = 'none';  // Oculta el contenedor del examen
}

function muestraMateriasAlu() {
    const contenedorClaveMateria = document.getElementById('contenedorClaveMateria');
    const listaMateriasDiv = document.getElementById('listaMaterias');
    const examenesDiv = document.getElementById("divParaExamenes");
    const examen = document.getElementById('examen');  // Obtiene el contenedor del examen
    
    contenedorClaveMateria.style.display = 'none';
    listaMateriasDiv.style.display = 'block';
    examenesDiv.style.display = 'none';
    examen.style.display = 'none';  // Oculta el contenedor del examen

    // Llamamos a la función para actualizar la lista de materias inscritas
    mostrarMateriasInscritas();
}


document.getElementById('menuToggle').addEventListener('change', function () {
    const menu = document.getElementById('menu');
    const mainContent = document.getElementById('mainContent');
    const contenidoExamen = document.getElementById('ExamClav');
    const conte = document.getElementById('contenidoExamenesClav');
    
    if (this.checked) {
        menu.style.left = '0';
        mainContent.style.marginLeft = '250px';
        if (contenidoExamen) {
            contenidoExamen.style.marginLeft='250px';
        }
        if (conte) {
            conte.style.marginLeft='-30px';
        }
    } else {
        menu.style.left = '-250px';
        mainContent.style.marginLeft = '0';
        if (contenidoExamen) {
            contenidoExamen.style.marginLeft='50px';
        }
    }
});
