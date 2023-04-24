const elementFont = document.getElementById('font')

// Modelo dos elementos que sofreram alteração
function fontName(fontName) {
    document.getElementById("hours").style.fontFamily = `\'${fontName}\'`
    document.getElementById("minutes").style.fontFamily = `\'${fontName}\'`
    document.getElementById("seconds").style.fontFamily = `\'${fontName}\'`
}

// Valor que será atribuído aos elementos que sofreram alteração
function fontChange(fontChange) {
    switch (fontChange) {
        case "brunoace":
            fontName("Bruno Ace")
        break
        case 'abel':
            fontName("Abel")
        break 
        case "roboto":
            fontName("Roboto")
        break
        default:
            fontName("Roboto")
        break
    }
}

// Verifica os dados locais e adiciona caso exista
(function fontLocal() {
    if(localStorage.getItem("elementFont") !== null) {
        fontChange(localStorage.getItem("elementFont"))
    } 
})()

// Verifica alteração na configuração e altera o valor, além de adicionar no localstorage
elementFont.addEventListener("change",() => {
    localStorage.setItem("elementFont", elementFont.value)
    fontChange(elementFont.value)
})
