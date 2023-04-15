const pokemon_list = document.getElementById("pokemon_list")
const loadmore = document.getElementById("loadmore")
const limit = 10 
let offset = 0
const requestLimit = 100

function PokemonLi (pokemon) {
    return `<li class="pokemon ${pokemon.type}">
    <span class="pokemon_number">#${pokemon.number}</span>
    <span class="pokemon_name">${pokemon.name}</span>
    <div class="pokemon_detail">
        <ol class="pokemon_types">
            ${pokemon.types.map((type)=>`<li class="pokemon_type ${type} icon">${type}</li>`).join(" ")}
        </ol>
    <img src="${pokemon.photo}" alt="${pokemon.name}" class="pokemon_img">
    </div>
    </li>`
}

function loadPokemon (offset, limit) {
    pokeApi.getpokemons(offset, limit).then((pokemons) => {
        pokemon_list.innerHTML += pokemons.map(PokemonLi).join("")
    })
    .catch ((error) => console.error(error)) // mostra o erro
}

loadPokemon()

loadmore.addEventListener("click", () => {
    offset += limit
    const requestPage = requestLimit - offset 
    if (requestPage > 0) {
        loadPokemon(offset, limit)
    } else {
        loadmore.parentElement.removeChild(loadmore)
    }
})
