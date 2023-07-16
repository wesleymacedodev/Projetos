const config = require("./src/scripts/config");
const {shell} = require('electron');
const game_list = document.getElementById("game_list");
const refresh = document.getElementById("refresh");
const fs = require('fs');

refresh.addEventListener("click", () => location.href = location.href)

global.play = function(file) {
    shell.openExternal(file)
}

global.delete_game = function(index) {
    let game_image = `${config.readConfig().games[index].game}.png`
    fs.rm(`./src/images/${game_image}`, { recursive: false }, err => {console.error(err)})
    config.deleteConfig(index)
    location.href = location.href
}

if (config.readConfig().games.length > 0) {
    config.readConfig().games.forEach((element, index) => {
        let newElement = `
    <div class="game">
        <img src="${element.image == "" ? "./src/images/no_thumbnail.png" : element.image}" alt="" class="icon">
        <h1 class="title">${element.game}</h1>
        <button class="play" onclick="(() => play('${element.path.replace(/\\/g, '\\\\')}'))()">Play</button>
        <div class="update">
        <button class="edit" id="gameid_${index}">Edit</button>
        <button class="delete" onclick="(() => delete_game(${index}))()">Delete</button>
        </div>
    </div>
        `
        game_list.insertAdjacentHTML("beforeend", newElement)

        let game_info = config.readConfig().games[index];
        let edit = document.getElementById(`gameid_${index}`)
        
        edit.addEventListener('click', () => {
            if (document.getElementById(`gameid_${index}_screen`) == null) {
              let newElement = `
                <form action="" class="addgame" id="gameid_${index}_screen">
                <div class="close" id="close_editgame_screen_${index}">X</div>
                <div class="sections">
                    <label for="game" class="text">Nome Do Jogo <span class="required">*</span></label>
                    <input type="text" name="game" id="game" class="input" required value="${game_info.game}">
                </div>
                <div class="sections">
                    <label for="image" class="text">Imagem</label>
                    <input type="file" name="image" id="image" class="input">
                </div>
                <div class="sections">
                    <label for="path" class="text">Executável</label>
                    <input type="file" name="path" id="path" class="input">
                </div>
                <button class="add" type="submit">Adicionar</button>
            </form>
          `;
            game_list.insertAdjacentHTML("beforeend",newElement)
            document.getElementById(`gameid_${index}_screen`).addEventListener("submit", e => {
                try { var game_name_edit = document.getElementById("game").value } catch { var game_name_edit = false }
                try { var game_path_edit = document.getElementById("path").files[0].path } catch { var game_path_edit = false}
                try { var game_image_edit = document.getElementById("image").files[0].path } catch { var game_image_edit = false}
                config.editConfig(index, game_name_edit,game_image_edit,game_path_edit)
            })
            let close = document.getElementById(`close_editgame_screen_${index}`)
            close.addEventListener("click", () => {document.getElementById(`gameid_${index}_screen`).remove()})
    }});
    });
} else {
    let message = document.createElement("h1");
    message.innerText = "Adicione um jogo!"
    message.style = `
    color: var(--font-color);
    margin: auto;
    padding: 100px;
    `
    game_list.appendChild(message);
}
