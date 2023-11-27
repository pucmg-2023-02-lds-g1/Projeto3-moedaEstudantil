import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para retornar o ID do usuário com base no email e senha fornecidos.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Executa a consulta no banco de dados
  connection.query(
    `SELECT ${req.body.id} AS id FROM ${req.body.tabela} where email = "${req.body.email}" and senha = "${req.body.senha}" LIMIT 1;`,
    (err, rows, fields) => {
      // Trata quaisquer erros que ocorram durante a consulta
      if (err) {
        return res.json({
          tipo: "Erro ao retornar dados",
          mensagem: err,
        });
      }

      // Verifica se o usuário não foi encontrado
      if (rows[0] == null) {
        return res.json({
          tipo: "Usuário não encontrado",
          mensagem: "Verifique os dados inseridos",
        });
      }

      // Retorna o ID do usuário e uma mensagem de sucesso
      return res.json({
        id: rows[0].id,
        s: "funcionando",
      });
    },
  );
};

// Exporta a função execute
module.exports = execute;
