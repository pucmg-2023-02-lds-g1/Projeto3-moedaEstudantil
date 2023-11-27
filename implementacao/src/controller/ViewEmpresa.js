import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para obter informações de uma empresa com base no ID fornecido.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Consulta o banco de dados para obter informações da empresa com base no ID fornecido na requisição
  connection.query(
    `SELECT * FROM empresa WHERE id = ${req.body.id};`,
    (err, rows, fields) => {
      // Trata quaisquer erros que ocorram durante a consulta
      if (err) {
        return res.json({
          tipo: "Erro ao retornar dados da empresa",
          mensagem: err,
        });
      }

      // Verifica se a consulta retornou algum resultado
      if (rows.length === 0) {
        return res.json({
          tipo: "Erro ao retornar dados da empresa",
          mensagem:
            "O código da empresa logada está incorreto ou não existe no banco de dados",
        });
      }

      // Responde com as informações da empresa obtidas da consulta
      return res.json({
        empresa: {
          nome: rows[0].nome,
          cnpj: rows[0].cnpj,
          email: rows[0].email,
          senha: rows[0].senha,
        },
      });
    },
  );
};

// Exporta a função execute
module.exports = execute;
