const searchPokemon = () =>{
    const getPokemon = id => `https://pokeapi.co/api/v2/pokemon/${id }`

    pokemonPromisses = []
    for (let i = 1; i <= 150; i++) {
        pokemonPromisses.push( fetch(getPokemon(i)).then(response => response.json()))
       
    }

    Promise.all(pokemonPromisses)
    .then(pokemons => {
     const listPokemons = pokemons.reduce((accumulate , pokemon) => {
            const types = pokemon.types.map(typeInform => typeInform.type.name)


            accumulate += `
            <li class="card ${types[0]}"> 
            <img class="card-img" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"></img>
            <h2 class="card-name">${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-description">${types.join(' | ')}</p>

            </li>
            `
            return accumulate
        }, '')
        const ul = document.querySelector('[data-js="pokedex"]')
         
        ul.innerHTML = listPokemons
    })

}

searchPokemon()