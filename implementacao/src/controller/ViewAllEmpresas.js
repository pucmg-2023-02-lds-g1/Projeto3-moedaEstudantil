import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para obter informações de todas as empresas.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Consulta o banco de dados para obter todas as linhas da tabela empresa
  connection.query(`SELECT * FROM empresa;`, (err, rows, fields) => {
    // Trata quaisquer erros que ocorram durante a consulta
    if (err) {
      return res.json({
        tipo: "Erro ao retornar dados das empresas",
        mensagem: err,
      });
    }

    // Responde com as informações das empresas obtidas da consulta
    return res.json({
      empresas: rows,
    });
  });
};

// Exporta a função execute
module.exports = execute;
