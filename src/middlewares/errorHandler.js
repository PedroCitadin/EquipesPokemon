module.exports = function (err, req, res, next) {
    if (res.statusCode == 200) {
        res.statusCode = 500
    }
    res.json({ erro: err.message })
}