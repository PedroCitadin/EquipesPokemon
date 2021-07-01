const express = require('express')
const route = express.Router()
const equipe = require("../models/equipe")
const treinador = require("../models/treinador")
const pokemon = require("../models/pokemon")
const axios = require('axios').default
route.use(express.urlencoded({ extended: true }));
route.use(express.json());
route.post('/', async function (req, res, next) {
    try {


        if (req.body == null) {
            console.log(req)
            throw new Error("Requisição em branco!!")
        } else {

            const nome = req.body.nome
            const treinador = req.body.treinador
            const descricao = req.body.descricao
            let pokemons = req.body.pokemons
            if (pokemons.length > 6 || pokemons.length == 0) {
                throw new Error("É preciso informar de 1 a 6 pokemons!")
            }
            for (var i = 0; i < pokemons.length; i++) {
                pokemons[i] = await pokemon.findById(pokemons[i])
            }
            let Equipe = new equipe({
                nome: nome,
                treinador: treinador,
                descricao: descricao,
                pokemons: pokemons
            })
            Equipe.save()
            res.send("Equipe salva com sucesso!")
        }
    } catch (err) {
        next(err)
    }
})
route.get('/', async function (req, res) {

    let docs = await equipe.find()
    if (docs.length == 0) {
        res.statusCode = 204

    }
    res.json(docs)



})
route.get('/:id', async function (req, res, next) {
    try {
        let docs = await equipe.findById(req.params.id)
        var tid = docs.treinador
        docs.treinador = await treinador.findById(tid)
        if (!docs) {
            res.statusCode = 404
            throw new Error("Equipe não encontrada!")
        }
        res.json(docs)
    } catch (err) {
        if (res.statusCode == 404) {

            res.send(err.message)
        } else {
            next(err)
        }
    }



})
route.delete('/:id', async function (req, res, next) {
    try {
        const id = req.params.id
        const resultado = await equipe.findByIdAndDelete(id)
        res.send("Equipe deletada com sucesso")


    } catch (err) {
        next(err)
    }

})
route.put('/:id', async function (req, res, next) {
    try {
        const id = req.params.id
        let albody = req.body
        if (albody.pokemons != undefined) {
            let pokemons = albody.pokemons
            if (pokemons.length > 6 || pokemons.length == 0) {
                throw new Error("É preciso informar de 1 a 6 pokemons!")
            }
            for (var i = 0; i < pokemons.length; i++) {
                pokemons[i] = await pokemon.findById(pokemons[i])
            }
            albody.pokemons = pokemons
        }

        const resultado = await equipe.findByIdAndUpdate(id, albody)
        res.send("Equipe alterada com sucesso")


    } catch (err) {
        next(err)
    }

})












module.exports = route