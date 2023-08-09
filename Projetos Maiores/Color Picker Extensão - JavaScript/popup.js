const btnSelector = document.getElementById("selector")
const colorBox = document.getElementById("color-box")
const colorText = document.getElementById("color-text")
const historyColor = document.getElementById("history-color")
import DB from "./db.js";

function colorUpdate() {
    let data = new DB()
    historyColor.innerHTML = ""
    colorBox.style.backgroundColor = data.currentColor() 
    colorText.innerText = data.currentColor() 
    colorBox.addEventListener("click", () => navigator.clipboard.writeText(data.currentColor()))
    data.historyColor().map(element => {
        let newElement = document.createElement("div")
        newElement.id = "color-box"
        newElement.setAttribute("value", element)
        newElement.style.backgroundColor = element
        newElement.addEventListener("click", () => {
            navigator.clipboard.writeText(element)
        })
        historyColor.appendChild(newElement)
    });
}

btnSelector.addEventListener("click", () => {
    function colorShow(color) {
        let data = new DB(color)
        data.currentColorSave()
        data.historyColorSave()
        colorUpdate()
    }
    async function colorPicker() {
        let eyeDropper = new EyeDropper();
        let result = await eyeDropper.open()
        colorShow(result.sRGBHex)
    }
    colorPicker();
});

colorUpdate()