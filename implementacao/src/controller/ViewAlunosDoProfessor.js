import { connection } from "../../server";
const execute = function (req, res) {
  connection.query(
    `SELECT DISTINCT aluno.idAluno, aluno.nome, aluno.email FROM aluno INNER JOIN professor ON aluno.Instituicao_id = professor.Instituicao_id WHERE professor.Instituicao_id = ${req.body.id};`,

    (err, rows, fields) => {
      if (err) {
        return res.json({
          tipo: "Erro ao retornar alunos do professor",
          mensagem: err,
        });
      }

      // console.log(rows)

      return res.json({
        alunos: rows,
      });
    },
  );
};

module.exports = execute;

