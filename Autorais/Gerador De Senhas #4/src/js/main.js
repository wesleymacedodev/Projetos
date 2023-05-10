const display = document.querySelector(".password-generator .display")
const passSizeInput = document.querySelector(".password-generator .size input")
const passSizeLabel = document.querySelector(".password-generator .size label")
const passUppercase = document.getElementById("uppercase")
const passLowercase = document.getElementById("lowercase")
const passNumber = document.getElementById("number")
const passSymbol = document.getElementById("symbol")
const passGenerate = document.getElementById("generate")

// CharCode List
// https://www.rapidtables.com/code/text/ascii-table.html

const getLowercase = () => {
    let lowercase = []
    for( let i = 0; i<26;i++) {
        lowercase.push(String.fromCharCode(Math.floor(i) + 97))
    }
    return lowercase
}

const getUppercase = () => {
    let uppercase = []
    for( let i = 0; i<26;i++) {
        uppercase.push(String.fromCharCode(Math.floor(i) + 65))
    }
    return uppercase
}

const getNumber = () => {
    let number = []
    for( let i = 0; i<10;i++) {
        number.push(String.fromCharCode(Math.floor(i) + 48))
    }
    return number
}

const getSymbol = () => {
    let symbol = []
    let symbols = "{}()[]<>#@!$&%"
    for (let i = 0; i < symbols.length; i++) {
        symbol.push(symbols[i])
    }
    return symbol
}

function generate(checkLowercase, checkUppercase, checkNumber, checkSymbol, checkSizeInput) {
    if(!checkLowercase && !checkUppercase && !checkNumber && !checkSymbol) {return display.innerText = "Opção Invalida"}
    let elements = []
    let password = ""
    checkLowercase ? elements.push.apply(elements, getLowercase()) : []
    checkUppercase ? elements.push.apply(elements, getUppercase()) : []
    checkNumber ? elements.push.apply(elements, getNumber()) : []
    checkSymbol ? elements.push.apply(elements, getSymbol()) : []
    for (let i = 0; i < checkSizeInput; i++) {
        password += elements[Math.floor(Math.random() * elements.length)]
    }
    display.innerText = password
}

passSizeInput.oninput = () => passSizeLabel.innerHTML = passSizeInput.value

passGenerate.addEventListener("click", () => generate(
    checkLowercase = passLowercase.checked, 
    checkUppercase = passUppercase.checked, 
    checkNumber = passNumber.checked,
    checkSymbol = passSymbol.checked, 
    checkSizeInput = Number(passSizeLabel.textContent)
))