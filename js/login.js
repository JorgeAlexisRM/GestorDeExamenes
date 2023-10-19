function ingresar() {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            alert("Secion iniciada");

            console.log(user);

            var usuario = {id:user.uid};
            var usuarioSerializado = JSON.stringify(usuario);
            localStorage.setItem('usuario',usuarioSerializado);

            window.location.href = "prueba.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage+" -espacio- "+errorCode);
        });
}

function registrar() {
    const email = document.getElementById('EmailRegistro').value;
    const password = document.getElementById('ClaveRegistro').value;
    const name = document.getElementById('NombreRegistro').value;
    const rol = document.querySelector('input[name="'+/*Editar con el name del radioGroup*/'"]:checked').value
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            
            crearUsuario(user,rol,name);
            window.location.href = "login.html";

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            alert(errorMessage+errorCode);
        });
}

function crearUsuario(user,rol,name){
    db.collection("usuarios").doc(user.uid).set({
        name: name,
        email: user.email,
        rol: rol
    })
    .then(() => {
        console.log("Usuario Registrado Exitosamente");
    })
    .catch((error) => {
        console.error("Error al registrar Usuario...", error);
    });
}