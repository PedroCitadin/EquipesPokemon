const mongoose = require('mongoose')
const uri = "mongodb+srv://pedro:fzqoPqiP8HcwQQb7@cluster0.ausec.mongodb.net/timesPokemon?retryWrites=true&w=majority"
const opcoes = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, opcoes)

mongoose.connection.on('connected', function () {
    console.log("Conexão com o banco realizada com sucesso!")
})

module.exports = mongoose