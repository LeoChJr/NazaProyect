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

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Funciones de validación
function validarEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validarPassword(password) {
  return password.length >= 6; // Firebase requiere mínimo 6 caracteres
}

// Función para registrar un nuevo usuario
function registrar() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  // Validar el email y la contraseña antes de registrar
  if (!validarEmail(email)) {
    showRegisterErrorMessage("Por favor, ingresa un email válido.");
    return;
  }

  if (!validarPassword(password)) {
    showRegisterErrorMessage("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Usuario registrado:", userCredential.user);
      clearRegisterErrorMessage();
      limpiarCamposRegistro();
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

  // Validar el email antes de iniciar sesión
  if (!validarEmail(email)) {
    showErrorMessage("Por favor, ingresa un email válido.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuario inició sesión:", user);
      clearErrorMessage();
      limpiarCamposLogin();

      // Redirigir a la página msistema.html
      window.location.href = "msistema.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = handleError(errorCode);
      showErrorMessage(errorMessage);
    });
}

// Manejo de errores
function handleError(errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "El email ingresado no es válido.";
    case "auth/user-not-found":
      return "No estás registrado. Por favor, regístrate.";
    case "auth/wrong-password":
      return "Contraseña incorrecta.";
    default:
      return "Ocurrió un error. Inténtalo de nuevo.";
  }
}

// Limpieza de mensajes de error
function clearErrorMessage() {
  document.getElementById("errorMessage").textContent = "";
}

function showErrorMessage(message) {
  document.getElementById("errorMessage").textContent = message;
}

function showRegisterErrorMessage(message) {
  document.getElementById("registerErrorMessage").textContent = message;
}

function clearRegisterErrorMessage() {
  document.getElementById("registerErrorMessage").textContent = "";
}

// Limpiar campos de entrada
function limpiarCamposRegistro() {
  document.getElementById("registerEmail").value = "";
  document.getElementById("registerPassword").value = "";
}

function limpiarCamposLogin() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
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
