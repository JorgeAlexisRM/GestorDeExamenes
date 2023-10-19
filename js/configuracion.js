// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
    apiKey: "AIzaSyAOjtsUP_WObegMi1qFiuMPeWjGfl5rbps",
    authDomain: "gestor-de-examenes.firebaseapp.com",
    projectId: "gestor-de-examenes",
    storageBucket: "gestor-de-examenes.appspot.com",
    messagingSenderId: "519988131172",
    appId: "1:519988131172:web:870a3d62e32fcdc5043671",
    measurementId: "G-P1H1FGBWB7"
});

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();