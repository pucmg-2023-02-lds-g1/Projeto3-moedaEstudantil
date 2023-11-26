import { connection } from "../../server";
const execute = function (req, res) {
  connection.query(
    `SELECT * FROM Transacoes WHERE Aluno_idAluno = ?;`,
    [req.body.id],
    (err, rows, fields) => {
      if (err) {
        return res.json({
          tipo: "Erro ao retornar transações do Aluno",
          mensagem: err,
        });
      }

      const transacoes = rows;

      if (transacoes.length === 0) {
        return res.json({
          transacoes: [],
        });
      }

      const professorIDs = transacoes.map(
        (transacao) => transacao.Professor_idProfessor,
      );
      const professorIDsString = professorIDs.join(",");

      connection.query(
        `SELECT idProfessor, nome FROM Professor WHERE idProfessor IN (${professorIDsString});`,
        (err, professorRows, fields) => {
          if (err) {
            return res.json({
              tipo: "Erro ao retornar nomes dos Professor",
              mensagem: err,
            });
          }

          const professorMap = {};
          professorRows.forEach((professor) => {
            professorMap[professor.idProfessor] = professor.nome;
          });

          const transacoesComNomes = transacoes.map((transacao) => {
            return {
              ...transacao,
              nomeProfessor: professorMap[transacao.Professor_idProfessor],
            };
          });

          return res.json({
            transacoes: transacoesComNomes,
          });
        },
      );
    },
  );
};

module.exports = execute;

