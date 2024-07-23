const qrcodeCreate = document.getElementById("qrcodeCreate")
const qrcodeReader = document.getElementById("qrcodeReader")
const createOption = document.getElementById("createOption")
const readerOption = document.getElementById("readerOption")
const qrcodeImage = document.getElementById("qrcodeImage")
const qrcodeText = document.getElementById("qrcodeText")
const qrcodeImageSrc = document.getElementById("qrcodeImageSrc")
const qrcodeTextOutput = document.getElementById("qrcodeTextOutput")

if (localStorage.getItem("screen") == null) {
    localStorage.setItem("screen", "create")
} 

updateElement()

createOption.addEventListener("click", () => {
    localStorage.setItem("screen", "create")
    updateElement()
})

readerOption.addEventListener("click", () => {
    localStorage.setItem("screen", "reader")
    updateElement()
})

function updateElement() {
    if (localStorage.getItem("screen") == "create") {
        qrcodeCreate.style = "display: flex;"
        createOption.classList.add("qrcodeOptionsSelected")
        qrcodeReader.style = "display: none;"
        readerOption.classList.remove("qrcodeOptionsSelected")
    } else {
        qrcodeReader.style = "display: flex;"
        readerOption.classList.add("qrcodeOptionsSelected")
        qrcodeCreate.style = "display: none;"
        createOption.classList.remove("qrcodeOptionsSelected")
    }
}

qrcodeCreate.addEventListener("submit", (event) => {
    event.preventDefault()
    let text = qrcodeText.value
    if(text == "") return 
    fetch("http://localhost:5000/qrcode?text="+encodeURIComponent(text), {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.blob())
    .then(img => URL.createObjectURL(img))
    .then(src => qrcodeImageSrc.src = src)
})

qrcodeReader.addEventListener("submit", (event) => {
    event.preventDefault()
    let imageFile = qrcodeImage.files[0]
    if (!imageFile) return
    let form = new FormData();
    form.append('image', imageFile)
    fetch("http://localhost:5000/qrcode", {
        method: "POST",
        body: form
    })
    .then(response => response.json())
    .then(data => qrcodeTextOutput.innerText = data["response"])
})


