API EQUIPES POKEMON

Está api permite ao usuário criar equipes de pokemon, ela está
vinculada a API PokeAPI v2, sendo assim, possuí as informações de praticamente todos
os pokemons lançados até agora

A lógica da api funciona da seguinte forma:

É dividida em 3 recursos principais: 

Treinador;
Pokemon;
Equipe;

O treinador, como o nome sugere, é o treinador referente a cada pokemon e equipe, é o primeiro a ser criado,
é basicamente um nome de usuário;

o recurso pokemon representa as caracteristicas de cada pokemon unico, por exemplo, um nome (apelido), nível, os movimentos
conhecidos, o treinador referente e a espécie (a especie é referente aos pokemons presentes na PokeAPI);

a equipe é um grupo de pokemon (entre 1 e 6), além de um nome e uma descrição, e por fim o treinador referente;

OBS: varias equipes podem usar os mesmos pokemons, o treinador da equipe não precisa ser o mesmo do pokemon.


Como funciona:

As rotas estão divididas em:

/info - informações sobre o autor e a API

/api - a api em si com todos os recursos


/api/treinador - CRUD do treinador

/api/pokemon - CRUD dos pokemons

/api/equipe - CRUD das equipes