const mongoose = require('../data/index.js')

let timeSchema = new mongoose.Schema({
    nome: String,
    treinador: Object,
    descricao: String,
    pokemons: Array,


}, { timestamps: true })

let equipe = mongoose.model('equipe', timeSchema)

module.exports = equipe