const { connection } = require("../../server");
const execute = function (req, res) {

    // console.log("abacaxi")
    // console.log(req.body.id)
  
    connection.query(
      `SELECT idAluno, moeda FROM aluno WHERE idAluno =  ${req.body.id};`,
  
      (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro ao retornar a quantidade de moedas dos alunos",
            mensagem: err,
          });
        }
  
        //console.log(rows)
  
        return res.json({
          alunos: rows,
        });
      }
    );
}

module.exports = execute;