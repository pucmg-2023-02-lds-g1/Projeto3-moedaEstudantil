const { connection } = require("../../server");
const execute = function (req, res) {
    connection.query(`SELECT * FROM Professor;`,
      (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro ao retornar dados do Professor",
            mensagem: err
          })
        }
  
        return res.json({
          empresas: rows
        })
      })
  }

module.exports = execute;