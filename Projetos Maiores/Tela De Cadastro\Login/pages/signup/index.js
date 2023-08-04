const buttonHide = document.getElementById("form-password-hide")
const formsContent = document.getElementsByClassName("form-content")
const passwordLabel = document.getElementById("passwordlabel")
const passwordInput = document.getElementById("password")
const passwordAlert = document.getElementById("form-password-alert")
var passwordStatus = false
const userLabel = document.getElementById("userlabel")
const userInput = document.getElementById("user")
const userAlert = document.getElementById("form-user-alert")
var userStatus = false
const buttonSubmit = document.getElementById("submit")
const form = document.getElementById("form")
import { dbNewUser, dbExistUser } from "../../db.js"

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

userInput.addEventListener("keyup", () => {
    if (dbExistUser(userInput.value)) {
        userInput.classList.add("form-invalid")
        userLabel.classList.add("form-invalid")
        userStatus = false
        userAlert.innerHTML = "username em uso!"
    }
    else if (userInput.value.length  < 6) {
        userInput.classList.add("form-invalid")
        userLabel.classList.add("form-invalid")
        userStatus = false
        userAlert.innerHTML = "digite no mínimo 6 caracteres."
    } else {
        userInput.classList.remove("form-invalid")
        userLabel.classList.remove("form-invalid")
        userStatus = true
        userAlert.innerHTML = ""
    }
})

passwordInput.addEventListener("keyup", () => {
    if (passwordInput.value.length  < 6 ) {
        passwordInput.classList.add("form-invalid")
        passwordLabel.classList.add("form-invalid")
        passwordStatus = false
        passwordAlert.innerHTML = "digite no mínimo 6 caracteres."
    } else {
        passwordInput.classList.remove("form-invalid")
        passwordLabel.classList.remove("form-invalid")
        passwordStatus = true
        passwordAlert.innerHTML = ""
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (passwordStatus && userStatus) {
        dbNewUser(userInput.value, passwordInput.value)
        window.location.href = "../website/index.html"
    } 
})