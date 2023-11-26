const { connection } = require("../../server");
const execute = function (req, res) {
    connection.query(`SELECT * FROM Transacoes WHERE Professor_idProfessor = ?;`, [req.body.idProfessor],
      (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro ao retornar transações do Professor",
            mensagem: err
          })
        }
  
        return res.json({
          transacoes: rows
        })
      })
  }

module.exports = execute;