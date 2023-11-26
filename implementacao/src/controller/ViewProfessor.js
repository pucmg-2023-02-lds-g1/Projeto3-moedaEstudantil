const { connection } = require("../../server");
const execute = function (req, res) {
    connection.query(`SELECT * FROM professor WHERE idProfessor = ${req.body.id};`,
      (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro ao retornar dados do professor",
            mensagem: err
          })
        }
        if (rows[0] == null) {
          return res.json({
            tipo: "Erro ao retornar dados do professor",
            mensagem: "O código do professor logado está errado ou não existe"
          })
        }
  
        return res.json({
          professor: {
            nome: rows[0].nome, cpf: rows[0].cpf, email: rows[0].email, senha: rows[0].senha, endereco: rows[0].endereco, rg: rows[0].rg, moedas: rows[0].moedas, instituicao: rows[0].Instituicao_id
          }
        })
      })
  }

module.exports = execute;