const fs = require('fs');
const config = require('./src/scripts/config')

const addgame = document.getElementById("addgame")

document.addEventListener('DOMContentLoaded', () => {
  addgame.addEventListener('click', () => {
    if (document.getElementById("addgame_screen") == null) {
    let newElement = `
      <form action="" class="addgame" id="addgame_screen">
      <div class="close" id="close_addgame_screen">X</div>
      <div class="sections">
          <label for="game" class="text">Nome Do Jogo <span class="required">*</span></label>
          <input type="text" name="game" id="game" class="input" required>
      </div>
      <div class="sections">
          <label for="image" class="text">Imagem</label>
          <input type="file" name="image" id="image" class="input">
      </div>
      <div class="sections">
          <label for="path" class="text">Executável <span class="required">*</span></label>
          <input type="file" name="path" id="path" class="input" required>
      </div>
      <button class="add" type="submit">Adicionar</button>
  </form>
`;
  game_list.insertAdjacentHTML("beforeend",newElement)
  const addgame_screen = document.getElementById("addgame_screen")
  addgame_screen.addEventListener("submit", e => {
    let gameName = document.getElementById("game").value
    let filePath = document.getElementById('path').files[0].path;
    try {
      var fileImage = document.getElementById('image').files[0].path;
    } catch {
      var fileImage = "./src/images/no_thumbnail.png"
    }
    config.addConfig(gameName, fileImage,filePath)
  })
  const close = document.getElementById("close_addgame_screen")
  close.addEventListener("click", () => {addgame_screen.remove()}, false)
}  })
});

