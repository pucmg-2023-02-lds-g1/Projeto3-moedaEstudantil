const { connection } = require("../../server");
const execute = function (req, res) {
    connection.query(`UPDATE aluno SET nome = "${req.body.nome}", cpf = "${req.body.cpf}", email = "${req.body.email}", senha = "${req.body.senha}", endereco = "${req.body.endereco}", Instituicao_id = ${Number(req.body.instituicao)}, Curso_idCurso = ${Number(req.body.curso)} WHERE idAluno = ${req.body.id};`,
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