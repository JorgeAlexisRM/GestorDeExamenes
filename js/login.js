function ingresar() {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            alert("Secion iniciada");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}
function registrar() {
    const email = document.getElementById('EmailRegistro').value;
    const password = document.getElementById('ClaveRegistro').value;
    const name = document.getElementById('NombreRegistro').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            
            //window.location.href = "login.html";
            crearUsuario(user,rol,name);

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            alert("ERROR AL REGISTRAR USUARIO..."+errorCode);
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