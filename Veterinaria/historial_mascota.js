import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC13egxtMiC_611gyNexGAMScfc9YvX9Ow",
    authDomain: "proyecto-905c6.firebaseapp.com",
    projectId: "proyecto-905c6",
    storageBucket: "proyecto-905c6.appspot.com",
    messagingSenderId: "767681703235",
    appId: "1:767681703235:web:228915f2dc7385bde9d3f6",
    measurementId: "G-WVV154Z5KN"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function() {
    const historialForm = document.getElementById("historialForm");
    const historialGuardado = document.getElementById("historialGuardado");

    historialForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const nombreMascota = document.getElementById("nombreMascota").value;
        const especieRaza = document.getElementById("especieRaza").value;
        const sexoEdad = document.getElementById("sexoEdad").value;
        const pesoTamaño = document.getElementById("pesoTamaño").value;
        const identificacion = document.getElementById("identificacion").value;
        const nombrePropietario = document.getElementById("nombrePropietario").value;
        const contactoPropietario = document.getElementById("contactoPropietario").value;
        const relacionPropietario = document.getElementById("relacionPropietario").value;
        const motivoConsulta = document.getElementById("motivoConsulta").value;
        const historiaMedica = document.getElementById("historiaMedica").value;
        const historialMedicacion = document.getElementById("historialMedicacion").value;
        const examenFisico = document.getElementById("examenFisico").value;
        const diagnosticoPresuntivo = document.getElementById("diagnosticoPresuntivo").value;
        const diagnosticosDiferenciales = document.getElementById("diagnosticosDiferenciales").value;
        const planTratamiento = document.getElementById("planTratamiento").value;
        const pronostico = document.getElementById("pronostico").value;
        const seguimiento = document.getElementById("seguimiento").value;
        const registroFechas = document.getElementById("registroFechas").value;
        const veterinarioAtencion = document.getElementById("veterinarioAtencion").value;

        // Guardar los datos en Firebase Firestore
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    await addDoc(collection(db, "historiales_clinicos"), {
                        userId: user.uid,
                        nombreMascota,
                        especieRaza,
                        sexoEdad,
                        pesoTamaño,
                        identificacion: identificacion || "No tiene",
                        nombrePropietario,
                        contactoPropietario,
                        relacionPropietario,
                        motivoConsulta,
                        historiaMedica,
                        historialMedicacion,
                        examenFisico,
                        diagnosticoPresuntivo,
                        diagnosticosDiferenciales,
                        planTratamiento,
                        pronostico,
                        seguimiento,
                        registroFechas,
                        veterinarioAtencion,
                        fechaRegistro: new Date()  // Guardar la fecha de creación
                    });

                    // Mostrar un mensaje de éxito y limpiar el formulario
                    alert("Historial clínico guardado correctamente.");
                    historialForm.reset();
                } catch (error) {
                    console.error("Error al guardar el historial clínico: ", error);
                    alert("Hubo un error al guardar el historial. Inténtalo nuevamente.");
                }
            } else {
                alert("Debes iniciar sesión para guardar el historial.");
            }
        });
    });
});
