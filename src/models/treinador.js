const mongoose = require('../data/index.js')

let treinadorSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    cidade: String,
    estado: String,
    pais: String


}, { timestamps: true })

let treinador = mongoose.model('treinador', treinadorSchema)

module.exports = treinador