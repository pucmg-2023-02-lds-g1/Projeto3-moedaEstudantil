const { connection } = require("../../server");
const execute = function (req, res) {
    connection.query(`UPDATE empresa SET nome = "${req.body.nome}", cnpj = "${req.body.cnpj}", email = "${req.body.email}", senha = "${req.body.senha}" WHERE id = ${req.body.id};`,
      (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro de alteração",
            mensagem: err
          })
        }
  
        return res.json({
          tipo: "Sucesso!",
          mensagem: "Usuario alterado",
          s: "funcionando"
        })
      })
  }

  module.exports = execute;