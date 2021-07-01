const express = require('express')
const route = express.Router()
const pokemons = require("./pokemon")
const treinadores = require("./treinador")
const equipes = require("./equipe")
route.use("/pokemon", pokemons)
route.use("/equipe", equipes)
route.use("/treinador", treinadores)
module.exports = route