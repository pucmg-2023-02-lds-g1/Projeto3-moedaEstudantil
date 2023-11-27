import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para obter a quantidade de moedas de um aluno com base no ID fornecido.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Consulta o banco de dados para obter a quantidade de moedas de um aluno com base no ID fornecido na requisição
  connection.query(
    `SELECT idAluno, moeda FROM aluno WHERE idAluno =  ${req.body.id};`,
    (err, rows, fields) => {
      // Trata quaisquer erros que ocorram durante a consulta
      if (err) {
        return res.json({
          tipo: "Erro ao retornar a quantidade de moedas dos alunos",
          mensagem: err,
        });
      }

      // Responde com as informações da quantidade de moedas do aluno obtidas da consulta
      return res.json({
        alunos: rows,
      });
    },
  );
};

// Exporta a função execute
module.exports = execute;
