import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para obter informações de todos os alunos.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Consulta o banco de dados para obter todas as linhas da tabela aluno
  connection.query(`SELECT * FROM aluno;`, (err, rows, fields) => {
    // Trata quaisquer erros que ocorram durante a consulta
    if (err) {
      return res.json({
        tipo: "Erro ao retornar dados dos alunos",
        mensagem: err,
      });
    }

    // Responde com as informações dos alunos obtidas da consulta
    return res.json({
      alunos: rows,
    });
  });
};

// Exporta a função execute
module.exports = execute;
