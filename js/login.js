function ingresar() {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            alert("Secion iniciada")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode + "*/*" + errorMessage);
        });

    //Verificando autenticacion
    auth.onAuthStateChanged(function (user) {
        if (user) {
            // El usuario está autenticado
            console.log("Usuario autenticado:", user.uid);

            var docRef = db.collection("usuarios").doc(user.uid);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    // creamos un objeto Usuario
                    var usuario = {id: doc.id, name: doc.data().name, rol:doc.data().rol};

                    // Serializa el objeto a una cadena JSON
                    var usuarioSerializado = JSON.stringify(usuario);

                    // Almacena la cadena en el localStorage
                    localStorage.setItem('usuario', usuarioSerializado);

                    //redirigimos a la seccion deacuerdo al rol
                    if(doc.data().rol === 'Maestro'){
                        window.location.href = "indexMaestro.html";
                    } else if(doc.data().rol === 'Estudiante'){
                        window.location.href = "indexalumno.html";
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No existe document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        } else {
            // El usuario no está autenticado
            console.log("Usuario no autenticado");
        }
    });
}

function registrar() {
    const email = document.getElementById('EmailRegistro').value;
    const password = document.getElementById('ClaveRegistro').value;
    const name = document.getElementById('NombreRegistro').value;
    const rol = document.querySelector('input[name="opcion"]:checked').value

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            //console.log(user+"\n"+rol+"\n"+name);
            crearUsuario(user, rol, name);

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            alert(errorMessage + errorCode);
        });
}

function crearUsuario(user, rol, name) {
    db.collection("usuarios").doc(user.uid).set({
        name: name,
        email: user.email,
        rol: rol
    })
        .then(() => {
            alert("Usuario Registrado Exitosamente");
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Error al registrar Usuario...", error);
        });
}