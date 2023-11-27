import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para obter informações de transações associadas a um professor.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Consulta o banco de dados para obter informações de transações associadas a um professor com base no ID fornecido na requisição
  connection.query(
    `SELECT * FROM Transacoes WHERE Professor_idProfessor = ?;`,
    [req.body.idProfessor],
    (err, rows, fields) => {
      // Trata quaisquer erros que ocorram durante a consulta
      if (err) {
        return res.json({
          tipo: "Erro ao retornar transações do Professor",
          mensagem: err,
        });
      }

      // Responde com as informações das transações obtidas da consulta
      return res.json({
        transacoes: rows,
      });
    },
  );
};

// Exporta a função execute
module.exports = execute;
