import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para retornar a quantidade de moedas de um aluno com base no ID fornecido.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Executa a consulta no banco de dados
  connection.query(
    `SELECT moeda FROM aluno WHERE idAluno =  ${req.body.id};`,
    (err, rows, fields) => {
      // Trata quaisquer erros que ocorram durante a consulta
      if (err) {
        return res.json({
          tipo: "Erro ao retornar a quantidade de moedas dos alunos",
          mensagem: err,
        });
      }

      // Retorna a quantidade de moedas do aluno
      return res.json({
        moeda: rows[0].moeda,
      });
    },
  );
};

// Exporta a função execute
module.exports = execute;
