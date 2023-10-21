examen = document.getElementById('examenes');

//Funciones para mestros
function mostrarMaterias(uidUser){
    db.collection("materias").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const aux = `${doc.data().idMaestro}`;

            if (aux === uidUser) {
                console.log(doc);
            }
        });
    });
}

function mostrarExamenes(uidUser){
    db.collection("examenes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const aux = `${doc.data().idMaestro}`;
            if (aux === uidUser) {
                console.log(doc);
            }
        });
    });
}

function mostrarPreguntas(idExamen){
    db.collection("preguntas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const aux = `${doc.data().idExamen}`;
            if (aux === idExamen) {
                console.log(doc);
            }
        });
    });
}

//Funciones base

function mostrar(userReference) {
    //Referencia a la materia
    var docRef = db.collection("materias").doc(userReference);

    //Solicitamos los datos del documento referido
    docRef.get().then(function (doc) {
        console.log(`${doc.id}`);
        console.log(`${doc.data().nombre}`);
        //Recorremos la colleccion examenes buscando los que pertenecen a la materia
        db.collection("examenes").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const aux = `${doc.data().idMateria}`;

                if (aux === userReference) {
                    mostrarExamen(`${doc.id}`);
                }
            });
        });
    });

}
function mostrarExamen(id) {
    var docRef = db.collection("examenes").doc(id);

    docRef.get().then(function (doc) {
        var datos = doc.data();
        console.log(`${doc.id}`);
        console.log(datos.titulo);
        db.collection("preguntas").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const aux = `${doc.data().idExamen}`;
                if (aux === id) {
                    mostrarContenido(`${doc.id}`);
                }
            });
        });
    });
}

function mostrarContenido(idRef){
    var docRef = db.collection("preguntas").doc(idRef);

    docRef.get().then(function(doc){
        var datos = doc.data();
        console.log(`${doc.id}`);
        console.log(`${datos.pregunta}`);
        console.log(`${datos.A}`);
        console.log(`${datos.B}`);
        console.log(`${datos.C}`);
        console.log(`${datos.respuesta}`);
    });
}