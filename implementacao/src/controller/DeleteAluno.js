const { connection } = require("../../server");
const execute = function (req, res) {
    connection.query(`DELETE from aluno WHERE idAluno = ${req.body.id};`,
      (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro na hora de deletar",
            mensagem: err
          })
        }
  
        return res.json({
          tipo: "Sucesso!",
          mensagem: "Aluno deletada com sucesso",
          s: "funcionando"
        })
      })
  }

module.exports = execute;