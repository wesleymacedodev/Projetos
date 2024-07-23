const uploadFile = document.getElementById("file")
const uploadFileName = document.getElementById("fileName")

uploadFile.addEventListener("change", () => {
    let fileName = uploadFile.value.split("\\")
    uploadFileName.innerText = fileName[fileName.length - 1]
})