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
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            
            window.location.href = "login.html";
            alert("Usuario creado");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            alert("ERROR AL REGISTRAR USUARIO..."+errorCode);
        });
}