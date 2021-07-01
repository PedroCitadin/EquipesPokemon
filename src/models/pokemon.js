const mongoose = require('../data/index.js')

let pokemonSchema = new mongoose.Schema({
    nome: String,
    especie: Object,
    nivel: Number,
    genero: String,
    treinador: Object,
    movimentos: Array

}, { timestamps: true })

let pokemon = mongoose.model('pokemon', pokemonSchema)

module.exports = pokemon