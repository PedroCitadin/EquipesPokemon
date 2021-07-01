const express = require('express')
const app = express()
const PORTA = process.env.PORT || 8080
const routes = require('./routes')
const erroHandler = require('./middlewares/errorHandler')
app.use('/api', routes)
app.use('/info', function (req, res) {
    const info = {
        Autor: "Pedro Citadin Coelho",
        Twitter: "https://twitter.com/PedroCitadin",
        Disciplina: "PPW 2",
        Fase: "5ª fase",
        Universidade: "Unesc"

    }
    res.json(info)
})
app.use(erroHandler)


app.listen(PORTA, function () {
    console.log("Ouvindo na porta " + PORTA)
})