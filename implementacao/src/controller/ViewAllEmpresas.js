const { connection } = require("../../server");
const execute = function (req, res) {

    connection.query(`SELECT * FROM empresa;`,
      (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro ao retornar dados das empresas",
            mensagem: err
          })
        }
  
        return res.json({
          empresas: rows
        })
      })
  }

module.exports = execute;