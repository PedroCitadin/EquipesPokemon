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

A api está hospedada em: https://apiequipespokemon.herokuapp.com/


/api/treinador:

Post deve conter:
nome
idade
cidade
estado
pais

Get pode conter o id de um treinador especifico ou irá retornar todos

DELETE deve conter como parametro o id de um treindor

PUT deve conter como parametro o id de um treinador e no corpo da requisição, os dados a serem alterados

/api/pokemon:

Post deve conter:
nome - String
nivel - Number
especie - código de um pokemon na PokeAPI v2 (numero na pokedex)
genero - String
treinador - id de um treinador especifico
movimentos - um array com os códigos dos movimentos de acordo com a especie na PokeAPI v2 (minimo 1 - maximo 4)

Get pode conter o id de um pokemon especifico ou irá retornar todos

DELETE deve conter como parametro o id de um pokemon

PUT deve conter como parametro o id de um pokemon e no corpo da requisição, os dados a serem alterados

/api/equipe:

Post deve conter:
nome - String
descricao - String
treinador - id de um treinador especifico
pokemons - um array com os códigos dos pokemons armazenados nesta api (minimo 1 - maximo 6)

Get pode conter o id de uma equipe especifica ou irá retornar todas

DELETE deve conter como parametro o id de uma equipe

PUT deve conter como parametro o id de uma equipe e no corpo da requisição, os dados a serem alterados


