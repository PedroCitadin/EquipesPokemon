const express = require('express')
const route = express.Router()
const pokemon = require("../models/pokemon")
const treinador = require("../models/treinador")
const axios = require('axios').default

route.use(express.urlencoded({ extended: true }))
route.use(express.json())
route.post('/', async function (req, res, next) {
    try {
        if (req.body == null) {
            console.log(req)
            throw new Error("Requisição em branco!!")
        } else {
            const nome = req.body.nome
            const nivel = req.body.nivel
            const genero = req.body.genero
            const treinador = req.body.treinador
            let idEspecie = req.body.especie
            let pkm
            var requisicao = axios.get("https://pokeapi.co/api/v2/pokemon/" + idEspecie)
            await requisicao.then(function (resposta) {
                pkm = resposta.data
            })
            const especie = {
                id: pkm.id,
                nome: pkm.name
            }
            let idMovimentos = req.body.movimentos
            let movimentos = []
            if (idMovimentos.length > 4 || idMovimentos.length == 0) {

                throw new Error("É preciso informar de 1 a 4 movimentos!!")
            }
            for (var i = 0; i < idMovimentos.length; i++) {
                movimentos.push(pkm.moves[idMovimentos[i]])
            }
            let Pokemon = new pokemon({
                nome: nome,
                especie: especie,
                nivel: nivel,
                genero: genero,
                treinador: treinador,
                movimentos: movimentos


            })
            Pokemon.save()
            res.send("Pokemon salvo com sucesso")

        }
    } catch (err) {
        next(err)
    }
})
route.get('/', async function (req, res) {

    let docs = await pokemon.find()
    if (docs.length == 0) {
        res.statusCode = 204

    }
    res.json(docs)



})
route.get('/:id', async function (req, res, next) {
    try {
        let docs = await pokemon.findById(req.params.id)
        var tid = docs.treinador
        const treina = await treinador.findById(tid)
        if (!docs) {
            res.statusCode = 404
            throw new Error("Pokemon não encontrado!")
        }
        let pkm
        var requisicao = axios.get("https://pokeapi.co/api/v2/pokemon/" + docs.especie.id)
        await requisicao.then(function (resposta) {
            pkm = resposta.data
        })
        docs.especie = pkm
        docs.treinador = treina

        res.json(docs)
    } catch (err) {
        if (res.statusCode == 404) {

            res.send(err.message)
        } else {
            next(err)
        }
    }



})

route.delete('/:id', async function (req, res, err) {
    try {
        const id = req.params.id
        const resultado = await pokemon.findByIdAndDelete(id)
        res.send("Pokemon deletado com sucesso")


    } catch (err) {
        next(err)
    }

})
route.put('/:id', async function (req, res) {
    try {
        const id = req.params.id
        let albody = req.body
        if (albody.especie != undefined) {
            let idEspecie = albody.especie
            let pkm
            var requisicao = axios.get("https://pokeapi.co/api/v2/pokemon/" + idEspecie)
            await requisicao.then(function (resposta) {
                pkm = resposta.data
            })
            albody.especie = pkm

        }
        if (albody.movimentos != undefined) {
            let pkm = await pokemon.findById(req.params.id)
            var requisicao = axios.get("https://pokeapi.co/api/v2/pokemon/" + pkm.especie.id)
            await requisicao.then(function (resposta) {
                pkm = resposta.data
            })

            let idMovimentos = albody.movimentos
            let movimentos = []
            if (idMovimentos.length > 4 || idMovimentos == 0) {
                throw new Error("É preciso informar de 1 a 4 movimentos!!")
            }
            for (var i = 0; i < idMovimentos.length; i++) {
                movimentos.push(pkm.moves[idMovimentos[i]])
            }
            albody.movimentos = movimentos
        }


        const resultado = await pokemon.findByIdAndUpdate(id, albody)
        res.send("Pokemon alterado com sucesso")


    } catch (err) {
        res.send(err.message)
    }

})

module.exports = route