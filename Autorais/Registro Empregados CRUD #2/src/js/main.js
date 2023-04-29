const addValue = document.getElementById("add-value")
const clearValue = document.getElementById("clear-value")
const registerElement = document.querySelector(".register-element")
const tableElements = document.getElementById("table-itens")
const submitName = document.getElementById("name")
const submitService = document.getElementById("service")
const submitSalary = document.getElementById("salary")
const submitButton = document.getElementById("btnSubmit")
const confirmationElement = document.getElementById("confirmation")

let id 
let itens 

// Adicionar e editar valores/elementos
function register(edit = false, index = 0) {
    registerElement.classList.add("active")  

    registerElement.onclick = element => {
      if (element.target.className.indexOf("register-element") !== -1) {
        registerElement.classList.remove("active")
      }
    }

    if (edit) {
      submitName.value = itens[index].name 
      submitService.value = itens[index].service 
      submitSalary.value = itens[index].salary 
      id = index 
    } else {
      submitName.value = ""
      submitService.value = ""
      submitSalary.value = ""
    }
}

// Limpar itens
function clearItens () {
  confirmationElement.classList.add("active")

  let blank_block = document.createElement("div")
  blank_block.style = `
  position: absolute; 
  top: 0; 
  width:100vw; 
  height: 100vh; 
  background-color: rgba(0, 0, 0, 0.4); 
  z-index: 1; 
  backdrop-filter: blur(2px);`

  document.body.appendChild(blank_block)

  blank_block.onclick = element => {
    confirmationElement.classList.remove("active")
    blank_block.remove()
  }
  let confirm = document.getElementById("confirmation-accept") 
  let decline = document.getElementById("confirmation-decline")
  confirm.onclick = () => {
    confirmationElement.classList.remove("active")
    blank_block.remove()
    clearElementItens()
    loadDB()
  }
  decline.onclick = () => {
    confirmationElement.classList.remove("active")
    blank_block.remove()
  }
}

// Edita o elemento
function editItem (index) {
  register(edit=true, index=index)
}

// Deleta o elemento
function deleteItem (index) {
  itens.splice(index, 1)
  setElementItens()
  loadDB()
}

// Função construtora dos Table Row
function addItem (item, index) {
  let tr = document.createElement("tr")
  tr.innerHTML = `
  <td>${item.name}</td>
  <td>${item.service}</td>
  <td>${item.salary}</td>
  <td><i onclick="editItem(${index})" id="edit" class="bi bi-tools"></i></td>
  <td><i onclick="deleteItem(${index})" id="delete" class="bi bi-trash3"></i></td>
  `
  tableElements.appendChild(tr)
}

// Botão de salvar
submitButton.onclick = element => {
  if(submitName.value == "" || submitService.value == "" || submitSalary.value == "") {
    return
  }
  element.preventDefault();
  if (id !== undefined) {
    itens[id].name = submitName.value
    itens[id].service = submitService.value 
    itens[id].salary = submitSalary.value 
  } else { 
    itens.push({"name": submitName.value, "service": submitService.value, "salary": submitSalary.value})
  }

  setElementItens()

  registerElement.classList.remove("active")
  loadDB()
  id = undefined
}

// Carregamento dos dados
function loadDB() {
  itens = getElementItens()
  tableElements.innerHTML = ""
  itens.forEach((element, index) => {
    addItem(element, index)  
  });
}

// Variaveis do banco de dados local
const getElementItens = () => JSON.parse(localStorage.getItem("localDB")) ?? []
const clearElementItens = () => localStorage.setItem("localDB", "[]")
const setElementItens = () => localStorage.setItem("localDB", JSON.stringify(itens))

loadDB()

