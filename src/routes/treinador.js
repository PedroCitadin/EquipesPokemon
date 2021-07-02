const express = require('express')
const route = express.Router()
const treinador = require("../models/treinador")
const axios = require('axios').default
route.use(express.urlencoded({ extended: true }))
route.use(express.json())
route.post('/', function (req, res, next) {
    try {
        if (req.body.nome == undefined && req.body.idade == undefined && req.body.cidade == undefined && req.body.estado == undefined && req.body.pais == undefined) {
            console.log(req)
            console.log("aqui")
            throw new Error("Requisição em branco!!")
        } else {
            console.log(req.body)
            const nome = req.body.nome
            const idade = req.body.idade
            const cidade = req.body.cidade
            const estado = req.body.estado
            const pais = req.body.pais

            let Treinador = new treinador({
                nome: nome,
                idade: idade,
                cidade: cidade,
                estado: estado,
                pais: pais
            })
            Treinador.save()
            res.send("Treinador salvo com sucesso!")
        }
    } catch (err) {
        next(err)
    }
})
route.get('/', async function (req, res) {



    let docs = await treinador.find()
    if (docs.length == 0) {
        res.statusCode = 204

    }
    res.json(docs)


})
route.get('/:id', async function (req, res, next) {
    try {
        let docs = await treinador.findById(req.params.id)
        if (!docs) {
            res.statusCode = 404
            throw new Error("Treinador não encontrado!")
        }


        res.json(docs)

    } catch (err) {
        if (res.statusCode == 404) {

            res.send(err.message)
        } else {
            res.statusCode = 404
            res.send("Treinador não encontrado, ID inválido")
        }
    }



})
route.delete('/:id', async function (req, res, next) {
    try {
        const id = req.params.id
        const resultado = await treinador.findByIdAndDelete(id)

        res.send("Treinador deletado com sucesso")


    } catch (err) {
        next(err)
    }

})
route.put('/:id', async function (req, res, next) {
    try {
        const id = req.params.id
        let albody = req.body




        const resultado = await treinador.findByIdAndUpdate(id, albody)
        res.send("Treinador alterado com sucesso")


    } catch (err) {
        next(err)
    }

})












module.exports = route