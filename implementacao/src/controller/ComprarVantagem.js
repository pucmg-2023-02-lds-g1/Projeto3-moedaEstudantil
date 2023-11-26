const { connection } = require("../../server");
const execute = function (req, res) {
    connection.query('INSERT INTO Vantagens_has_Aluno (Vantagens_idVantagem, Aluno_idAluno) values (?, ?)', [req.body.idVantagem, req.body.idAluno], (err, rows, fields) => {
      if (err) {
        return res.json({
          tipo: "Você já comprou essa vantagem",
          mensagem: err
        });
      } else {
        connection.query('update aluno set moeda = ? where idAluno = ?', [req.body.valorF, req.body.idAluno], (err, rows, fields) => {
          if (err) {
            return res.json({
              tipo: "Erro ao comprar a vantagem",
              mensagem: err
            });
          }
  
          return res.json({
            tipo: "Vantagem comprada",
          });
        });
      }
    });
  }

module.exports = execute;