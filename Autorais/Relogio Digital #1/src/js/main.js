const elementHours = document.getElementById("hours")
const elementMinutes = document.getElementById("minutes")
const elementSeconds = document.getElementById("seconds")
const elementSeparator = document.getElementsByClassName("separator")
const elementConfig = document.getElementById("config")
const elementOptions = document.getElementById("options")
const elementConfigExit = document.getElementById("exit-config")

// Formata o numero em dois digitos para todos ficarem em um formato especifico (00)
function format2digits(value) {
    return (value < 10 ? "0" : "") + value
}

// Puxa o horario atual e altera no elemento 
const clockTick = setInterval(()=>{
    let time = new Date()
    hours = time.getHours()
    minutes = time.getMinutes()
    seconds = time.getSeconds()
    elementHours.textContent = format2digits(hours)
    elementMinutes.textContent = format2digits(minutes)
    elementSeconds.textContent = format2digits(seconds)
},500) 

// Função que vai verificar se a aba está aberta ou não e executar a ação 
function OpenAndCloseConfig () {
    if (elementConfig.style.display == "none") {
        elementConfig.style.display = "flex"
    } else {
        elementConfig.style.display = "none"
    }
}

// Abrir e fechar a aba configuração ao clicar no botão
elementOptions.addEventListener('click', ()=>OpenAndCloseConfig())
elementConfigExit.addEventListener('click', () => OpenAndCloseConfig())
