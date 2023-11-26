import { connection } from "../../server";
const execute = function (req, res) {
  connection.query(`SELECT * FROM aluno;`, (err, rows, fields) => {
    if (err) {
      return res.json({
        tipo: "Erro ao retornar dados dos alunos",
        mensagem: err,
      });
    }

    return res.json({
      alunos: rows,
    });
  });
};

module.exports = execute;

