import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para retornar o preço de uma vantagem com base no ID fornecido.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Executa a consulta no banco de dados
  connection.query(
    `SELECT Preco FROM vantagens where idVantagem = ${req.body.idVantagem};`,
    (err, rows, fields) => {
      // Trata quaisquer erros que ocorram durante a consulta
      if (err) {
        return res.json({
          tipo: "Erro ao retornar preço",
          mensagem: err,
        });
      } else {
        // Retorna o preço da vantagem
        res.json({
          preco: rows[0].Preco,
        });
      }
    },
  );
};

// Exporta a função execute
module.exports = execute;
