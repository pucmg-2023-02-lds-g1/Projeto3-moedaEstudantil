const { connection } = require("../../server");
const execute = function (req, res) {
    connection.query(`SELECT * FROM aluno WHERE idAluno = ${req.body.id};`,
      (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro ao retornar dados do aluno",
            mensagem: err
          })
        }
        if (rows[0] == null) {
          return res.json({
            tipo: "Erro ao retornar dados do aluno",
            mensagem: "O código do aluno logado está errado ou não existe"
          })
        }
  
        return res.json({
          aluno: {
            nome: rows[0].nome, cpf: rows[0].cpf, email: rows[0].email, senha: rows[0].senha, endereco: rows[0].endereco, instituicao: rows[0].Instituicao_id, curso: rows[0].Curso_idCurso, moeda: rows[0].moeda
          }
        })
      })
  }

module.exports = execute;