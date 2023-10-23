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

//Controladores de Usuario
// Recupera la cadena JSON del localStorage
var usuarioSerializado = localStorage.getItem('usuario');

// Deserializa la cadena JSON a un objeto JavaScript
var usuario = JSON.parse(usuarioSerializado);

var tituloLogin = document.getElementById('usuario');
nombreUsuario(usuario.id);

// Encuentra el nombre de Usuario
function nombreUsuario(uidUser) {
    const docRef = db.collection("usuarios").doc(uidUser);
    //Solicitamos los datos del documento referido
    docRef.get().then((doc) => {
        console.log(doc.data());
        tituloLogin.innerHTML = doc.data().name;
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "*/*" + errorMessage);
    });
}

function cerrarSesion() {
    // Cerrar sesión en Firebase Authentication
    firebase.auth().signOut().then(function () {
        // Cierre de sesión exitoso
        alert("Nos vemos pronto..."+usuario.id);
        window.location.href = "login.html";
    }).catch(function (error) {
        // Manejo de errores
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "*/*" + errorMessage);
    });
}
