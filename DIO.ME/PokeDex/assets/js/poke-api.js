const pokeApi = {} // Criar objeto que vai receber valor

function PokemonInfo(PokemonDetail) {
    const pokemon = new Pokemon(); // construtor de classe
    pokemon.number = PokemonDetail.order
    pokemon.name = PokemonDetail.name 
    pokemon.photo = PokemonDetail.sprites.other.dream_world.front_default
    const types = PokemonDetail.types.map((typeSlot)=>typeSlot.type.name) // retorna a lista dos tipos
    const [ type ] = types // destruct, pega o primeiro elemento 
    pokemon.type = type 
    pokemon.types = types
    return pokemon // retorna a classe com os novos elementos
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response)=> response.json()).then(PokemonInfo)
    // pegar a url atraves do map e transforma-la em json
    // utiliza o PokemonInfo para facilitar a utilização dos novos objetos criados na class
}

// criar um metodo no objeto pokeApi.getpokemons()
pokeApi.getpokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json()) // retorna json
    .then((jsonBody) => jsonBody.results) // imprime o json no valor results
    .then((pokemonMap) => pokemonMap.map(pokeApi.getPokemonDetail)) // criar um objeto interativo com map
    .then((pokemonRequest)=> Promise.all(pokemonRequest)) // esperar que todas as promises sejam executadas
    .catch((error) => console.error(error)) // caso haja erros
} 

// Invocada no main.js