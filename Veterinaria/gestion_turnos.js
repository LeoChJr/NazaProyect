import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Configuración de tu aplicación Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC13egxtMiC_611gyNexGAMScfc9YvX9Ow",
    authDomain: "proyecto-905c6.firebaseapp.com",
    projectId: "proyecto-905c6",
    storageBucket: "proyecto-905c6.appspot.com",
    messagingSenderId: "767681703235",
    appId: "1:767681703235:web:228915f2dc7385bde9d3f6",
    measurementId: "G-WVV154Z5KN"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function() {
    const turnosForm = document.getElementById("turnosForm");

    if (turnosForm) {
        turnosForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const user = auth.currentUser;
            if (!user) {
                alert("Debes iniciar sesión para guardar un turno.");
                return;
            }

            const nombrePersona = document.getElementById("nombrePersona").value;
            const nombrePerro = document.getElementById("nombrePerro").value;
            const fechaConsulta = document.getElementById("fechaConsulta").value;
            const cantidadMascotas = document.getElementById("cantidadMascotas").value;

            try {
                const docRef = await addDoc(collection(db, "turnos"), {
                    nombrePersona,
                    nombrePerro,
                    fechaConsulta,
                    cantidadMascotas: Number(cantidadMascotas),
                    userId: user.uid
                });

                console.log("Documento escrito con ID: ", docRef.id);
                alert("Turno guardado exitosamente!");

                // Aquí ya no llamamos a generarTarjetas() porque las tarjetas ya fueron generadas en el formulario
                turnosForm.reset(); // Limpiar el formulario
                document.getElementById('formularios-mascotas').innerHTML = ''; // Limpiar los formularios de mascotas
                document.getElementById('tarjetas-mascotas').innerHTML = ''; // Limpiar las tarjetas previas

            } catch (e) {
                console.error("Error al agregar el documento: ", e.message);
                alert("Error al guardar el turno. Por favor, intenta de nuevo.");
            }
        });
    }
});


// Verificar el estado de autenticación cuando se carga la página
onAuthStateChanged(auth, (user) => {
    console.log("Usuario autenticado:", user);
    if (!user) {
        // Si no hay usuario autenticado, redirigir a la página de inicio de sesión
        window.location.href = "index.html";
    }
});
