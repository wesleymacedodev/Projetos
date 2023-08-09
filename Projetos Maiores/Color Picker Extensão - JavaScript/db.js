export default class DB{
    constructor (color) {
        this.color = color
    }
    currentColorSave() {
        localStorage.setItem("currentColor", String(this.color))
    }
    currentColor() {
        return localStorage.getItem("currentColor") || "white"
    }
    historyColorSave() {
        let oldHistory = JSON.parse(localStorage.getItem("historyColor")) || []
        if (!oldHistory.length <= 16) {
            oldHistory.shift()
        } 
        oldHistory.push(String(this.color))
        localStorage.setItem("historyColor", JSON.stringify(oldHistory))
    }
    historyColor() {
        let history = JSON.parse(localStorage.getItem("historyColor")) || []
        return history
    }
}
