const { connection } = require("../../server");
const execute = function (req, res) {
    connection.query(`SELECT Preco FROM vantagens where idVantagem = ${req.body.idVantagem};`,
      (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro ao retornar preço",
            mensagem: err
          })
        } else {
          res.json({
            preco: rows[0].Preco,
          })
        }
      })
  }

module.exports = execute;