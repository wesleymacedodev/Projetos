const elementFormat = document.getElementById("format")

// Modelo dos elementos que sofreram alteração
function formatChoice(formatChoice) {
    if (formatChoice == "HM") {
        elementSeconds.style.display = "none"
        elementSeparator[1].style.display = "none"
    } else {
        elementSeconds.style.display = "block"
        elementSeparator[1].style.display = "block"
    }
}

// Verifica os dados locais e adiciona caso exista
(function localFormat() {
    if(localStorage.getItem("elementFormat") !== null) {
        formatChoice(localStorage.getItem("elementFormat"))
    }
})();

// Verifica alteração na configuração e altera o valor, além de adicionar no localstorage
elementFormat.addEventListener("change", () => {
    localStorage.setItem("elementFormat", elementFormat.value)
    formatChoice(elementFormat.value) 
})