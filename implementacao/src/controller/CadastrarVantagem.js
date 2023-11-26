const { connection } = require("../../server");
const execute = function (req, res) {
    connection.query(`INSERT INTO vantagens (idVantagem, nome, descricao, foto, Empresa_id, Preco) values (default, "${req.body.nome}", "${req.body.desc}", "${req.body.url}", "${req.body.idEmpresa}", "${req.body.preco}");`,
      (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro ao cadastrar a vantagem",
            mensagem: err
          })
        }
  
        return res.json({
          transacoes: rows
        })
      })
}

module.exports = execute;