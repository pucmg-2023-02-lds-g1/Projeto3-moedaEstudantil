import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para retornar todas as transações de um aluno com base no ID fornecido.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Executa a consulta no banco de dados
  connection.query(
    `SELECT * FROM Transacoes WHERE Aluno_idAluno = ?;`,
    [req.body.id],
    (err, rows, fields) => {
      // Trata quaisquer erros que ocorram durante a consulta
      if (err) {
        return res.json({
          tipo: "Erro ao retornar transações do Aluno",
          mensagem: err,
        });
      }

      // Armazena as transações em uma variável
      const transacoes = rows;

      // Verifica se não há transações
      if (transacoes.length === 0) {
        return res.json({
          transacoes: [],
        });
      }

      // Obtém os IDs dos professores das transações
      const professorIDs = transacoes.map(
        (transacao) => transacao.Professor_idProfessor,
      );
      const professorIDsString = professorIDs.join(",");

      // Consulta o banco de dados para obter os nomes dos professores
      connection.query(
        `SELECT idProfessor, nome FROM Professor WHERE idProfessor IN (${professorIDsString});`,
        (err, professorRows, fields) => {
          // Trata quaisquer erros que ocorram durante a consulta
          if (err) {
            return res.json({
              tipo: "Erro ao retornar nomes dos Professor",
              mensagem: err,
            });
          }

          // Cria um mapa de ID de professor para nome de professor
          const professorMap = {};
          professorRows.forEach((professor) => {
            professorMap[professor.idProfessor] = professor.nome;
          });

          // Adiciona o nome do professor a cada transação
          const transacoesComNomes = transacoes.map((transacao) => {
            return {
              ...transacao,
              nomeProfessor: professorMap[transacao.Professor_idProfessor],
            };
          });

          // Retorna as transações com nomes de professores
          return res.json({
            transacoes: transacoesComNomes,
          });
        },
      );
    },
  );
};

// Exporta a função execute
module.exports = execute;
