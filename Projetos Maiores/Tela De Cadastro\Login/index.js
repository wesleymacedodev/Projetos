const buttonHide = document.getElementById("form-password-hide")
const userInput = document.getElementById("user")
const passwordInput = document.getElementById("password")
const form = document.getElementById("form")
const formAlert = document.getElementById("form-alert")
import { dbUserAutentication, dbUserLogged } from "./db.js"

function passwordEvent(status) {
    if (status) {
        passwordInput.type = 'text'
        buttonHide.className = "bi bi-eye form-password-hide"
    } else {
        passwordInput.type = 'password';
        buttonHide.className = "bi bi-eye-slash form-password-hide"
    }
}

buttonHide.addEventListener("click", () => {
    buttonHide.className == "bi bi-eye form-password-hide" ? passwordEvent(false) : passwordEvent(true)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (dbUserAutentication(userInput.value, passwordInput.value)) {
        dbUserLogged(userInput.value)
        window.location.href = "./pages/website/index.html";
    } else {
        passwordInput.classList.add("form-invalid")
        userInput.classList.add("form-invalid")
        formAlert.innerText = "usuário ou senha incorreto."
    }
})