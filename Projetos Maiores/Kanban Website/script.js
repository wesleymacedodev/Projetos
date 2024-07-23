localStorage.setItem("table", JSON.stringify(
    {
        "tables": {
            "To do": [],
            "Doing": [],
            "Do": []
        }
    }
))

const tablesElement = document.getElementById("tables")
const taskbarForm = document.getElementById("taskbar")
const taskbarTitle = document.getElementById("taskbarTitle")
const taskbarDescription = document.getElementById("taskbarDescription")
const taskbarAuthor = document.getElementById("taskbarAuthor")
const taskbarColor = document.getElementById("taskbarColor")
let tablesLoaded = []

function createTable(name) {
    let tableTable = document.createElement("div")
    let tableTitle = document.createElement("h2")
    let tableCards = document.createElement("div")
    tableTable.classList.add("table")
    tableTitle.classList.add("title")
    tableTitle.innerText = name
    tableCards.classList.add("cards")
    tableTable.appendChild(tableTitle)
    tableTable.appendChild(tableCards)
    return {tableTable, tableCards}
}

function createCard(title, description, author, color) {
    let cardCard = document.createElement("div")
    let cardHeader = document.createElement("div")
    let cardClose = document.createElement("div")
    let cardBody = document.createElement("div")
    let cardTitle = document.createElement("span")
    let cardDescription = document.createElement("p")
    let cardAuthor = document.createElement("span")
    cardCard.classList.add("card")
    cardCard.draggable = true
    cardHeader.classList.add("cardHeader")
    cardHeader.style = `background-color: ${color};`
    cardClose.classList.add("cardClose")
    cardClose.innerText = "X"
    cardBody.classList.add("cardBody")
    cardTitle.classList.add("cardTitle")
    cardTitle.innerText = title
    cardDescription.classList.add("cardDescription")
    cardDescription.innerText = description
    cardAuthor.classList.add("cardAuthor")
    cardAuthor.innerText = author
    cardCard.appendChild(cardHeader)
    cardCard.appendChild(cardBody)
    cardBody.appendChild(cardClose)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardDescription)
    cardBody.appendChild(cardAuthor)
    cardCard.addEventListener("dragstart", ()=> {
        cardCard.classList.add("dragging");
    })
    cardCard.addEventListener("dragend", () => {
        cardCard.classList.remove("dragging")
    })
    cardClose.addEventListener("click", () => {
        cardCard.remove()
    })
    return cardCard
}

let json = JSON.parse(localStorage.getItem("table"))
let tables = Object.keys(json["tables"])

for (table of tables) {
    let {tableTable, tableCards} = createTable(table)
    tablesElement.appendChild(tableTable)
    tablesLoaded.push({"table":tableTable,"cards":tableCards})
    for (tableInfo of json["tables"][table]) {
        tableCards.appendChild(createCard(tableInfo["title"], tableInfo["description"], tableInfo["author"], tableInfo["color"]))
    }
}

taskbarForm.addEventListener("submit", element => {
    element.preventDefault();
    let titleValue = taskbarTitle.value 
    let descriptionValue = taskbarDescription.value 
    let authorValue = taskbarAuthor.value 
    let colorValue = taskbarColor.value 
    let newCard = createCard(titleValue, descriptionValue, authorValue, colorValue)
    if (titleValue == "" || descriptionValue == "" || authorValue == "") return
    tablesLoaded[0]["cards"].appendChild(newCard)
    taskbarDescription.value = ""
} )


