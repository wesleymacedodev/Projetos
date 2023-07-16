const fs = require('fs');

const path = './src/config.json'

if (! fs.existsSync(path)) {
    const content = '{"games": []}';

    fs.writeFile(path, content, err => {
        if(err) {console.error(err)}
    });
}

function readConfig() {
    if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path));
    } 
}

function addConfig(game, game_image, game_path) {
    if (fs.existsSync(path)) {
        let config = JSON.parse(fs.readFileSync(path));
        config.games.push({game: game, image: game_image, path: game_path})
        fs.writeFile(path, JSON.stringify(config), err => {})
    } 
}

function deleteConfig(index) {
    let config = JSON.parse(fs.readFileSync(path));
    config.games.splice(index,1)
    fs.writeFileSync(path, JSON.stringify(config), err => {})
}

function editConfig(index, game=false, game_image=false, game_path=false) {
    let config = JSON.parse(fs.readFileSync(path));
    game ? config.games[index].game = game : null 
    game_image ? config.games[index].image = game_image : null 
    game_path ? config.games[index].path = game_path : null
    fs.writeFile(path, JSON.stringify(config), err => {})   
}

module.exports = { readConfig, addConfig, deleteConfig, editConfig }
//exports.readConfig = readConfig;