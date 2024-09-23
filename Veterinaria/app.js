// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Configuración de tu aplicación Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC13egxtMiC_611gyNexGAMScfc9YvX9Ow",
  authDomain: "proyecto-905c6.firebaseapp.com",
  projectId: "proyecto-905c6",
  storageBucket: "proyecto-905c6.appspot.com",
  messagingSenderId: "767681703235",
  appId: "1:767681703235:web:228915f2dc7385bde9d3f6",
  measurementId: "G-WVV154Z5KN",
};

// Inicialización de Firebase y funciones de registro y login (sin cambios)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Función para registrar un nuevo usuario
function registrar() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Usuario registrado:", userCredential.user);
      clearRegisterErrorMessage();
      switchToLogin(); // Volver a la pantalla de inicio de sesión
    })
    .catch((error) => {
      showRegisterErrorMessage(error.message);
    });
}

// Función para iniciar sesión de un usuario existente
function iniciarSesion() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Usuario ha iniciado sesión exitosamente
      const user = userCredential.user;
      console.log("Usuario inició sesión:", user);
      clearErrorMessage(); // Limpiar mensaje de error si el inicio es exitoso

      // Redirigir a la página msistema.html
      window.location.href = "msistema.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Si el código de error es 'auth/user-not-found', mostrar el mensaje personalizado
      if (errorCode === "auth/user-not-found") {
        showErrorMessage("No estás registrado. Por favor, regístrate.");
        switchToRegister(); // Cambiar a la pantalla de registro
      } else {
        // Para otros errores, mostrar el mensaje general
        showErrorMessage(errorMessage);
      }

      console.error(
        "Error durante el inicio de sesión:",
        errorCode,
        errorMessage
      );
    });
}

function clearErrorMessage() {
  document.getElementById("errorMessage").textContent = "";
}

function showRegisterErrorMessage(message) {
  document.getElementById("registerErrorMessage").textContent = message;
}

function clearRegisterErrorMessage() {
  document.getElementById("registerErrorMessage").textContent = "";
}

// Funciones para cambiar entre las pantallas de inicio de sesión y registro
function switchToRegister() {
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("registerContainer").style.display = "block";
}

function switchToLogin() {
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("registerContainer").style.display = "none";
}

// Asignar las funciones a los botones
document.getElementById("loginButton").addEventListener("click", iniciarSesion);
document.getElementById("registerButton").addEventListener("click", registrar);
document
  .getElementById("switchToRegisterButton")
  .addEventListener("click", switchToRegister);
document
  .getElementById("switchToLoginButton")
  .addEventListener("click", switchToLogin);
