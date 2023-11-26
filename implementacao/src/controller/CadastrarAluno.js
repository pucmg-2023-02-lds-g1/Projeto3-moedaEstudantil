
const { connection } = require("../../server");
const execute = function (req, res) {
    connection.query(`INSERT INTO aluno VALUES (NULL, "${req.body.nome}", "${req.body.senha}", "${req.body.email}", "${req.body.cpf}", 000000,  "${req.body.endereco}", 0, 1, ${req.body.instituicao});
    `,
      (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro de cadastro",
            mensagem: err
          })
        }
  
        return res.json({
          tipo: "Sucesso!",
          mensagem: "Usuario cadastrado",
          s: "funcionando"
        })
      })
}

module.exports = execute;