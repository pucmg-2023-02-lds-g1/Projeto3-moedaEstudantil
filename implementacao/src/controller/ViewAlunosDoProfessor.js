import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para obter informações distintas de alunos associados a um professor em uma instituição específica.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Consulta o banco de dados para obter informações distintas de alunos associados a um professor em uma instituição específica
  connection.query(
    `SELECT DISTINCT aluno.idAluno, aluno.nome, aluno.email FROM aluno INNER JOIN professor ON aluno.Instituicao_id = professor.Instituicao_id WHERE professor.Instituicao_id = ${req.body.id};`,
    (err, rows, fields) => {
      // Trata quaisquer erros que ocorram durante a consulta
      if (err) {
        return res.json({
          tipo: "Erro ao retornar alunos do professor",
          mensagem: err,
        });
      }

      // Responde com as informações dos alunos obtidas da consulta
      return res.json({
        alunos: rows,
      });
    },
  );
};

// Exporta a função execute
module.exports = execute;
