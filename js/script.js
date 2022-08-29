const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon)=>{ /*async sifnifica assincrono*/
    /*const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`); /*fech é assincrono*/
    /*await espera a ação do fetch concluir*/
    /*console.log(data)*/

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
        const data =APIResponse.json();
        return data;
    }  
}
/*fetchPokemon('25');*/

const renderPokemon = async (pokemon) => {
    /*const data = await fetchPokemon(pokemon);/*recebe dados do pokemon*/
    /*console.log(data);*/

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = ' ';
        
        searchPokemon = data.id; //se o pokemon é o 25 e dou next vai para o 26.
                                 //se não tivesse essa função iria para o 2
    }
    else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :c';
        pokemonNumber.innerHTML = '';
    }

}
/*renderPokemon('25');*/
/*renderPokemon('25');*/
/*renderPokemon('charizard');*/
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
    /*renderPokemon(input.value);
    renderPokemon(input.value.toLowerCase()); /*transforma todos os caracteres em minusculo */
    /*input.value = ' ';/*limpar o input*/
});

buttonPrev.addEventListener('click', () => {
    //alert('prev clicked')

    if(searchPokemon >1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
});
buttonNext.addEventListener('click', () => {
    //alert('next clicked')
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);


