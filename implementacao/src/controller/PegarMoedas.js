import { connection } from "../../server";
const execute = function (req, res) {
  connection.query(
    `SELECT moeda FROM aluno WHERE idAluno =  ${req.body.id};`,

    (err, rows, fields) => {
      if (err) {
        return res.json({
          tipo: "Erro ao retornar a quantidade de moedas dos alunos",
          mensagem: err,
        });
      }
      return res.json({
        moeda: rows[0].moeda,
      });
    },
  );
};

module.exports = execute;

