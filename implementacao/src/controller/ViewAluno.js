import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para obter informações de um aluno com base no ID fornecido.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Consulta o banco de dados para obter informações do aluno com base no ID fornecido na requisição
  connection.query(
    `SELECT * FROM aluno WHERE idAluno = ${req.body.id};`,
    (err, rows, fields) => {
      // Trata quaisquer erros que ocorram durante a consulta
      if (err) {
        return res.json({
          tipo: "Erro ao retornar dados do aluno",
          mensagem: err,
        });
      }

      // Verifica se a consulta retornou algum resultado
      if (rows[0] == null) {
        return res.json({
          tipo: "Erro ao retornar dados do aluno",
          mensagem:
            "O código do aluno logado está errado ou não existe no banco de dados",
        });
      }

      // Responde com as informações do aluno obtidas da consulta
      return res.json({
        aluno: {
          nome: rows[0].nome,
          cpf: rows[0].cpf,
          email: rows[0].email,
          senha: rows[0].senha,
          endereco: rows[0].endereco,
          instituicao: rows[0].Instituicao_id,
          curso: rows[0].Curso_idCurso,
          moeda: rows[0].moeda,
        },
      });
    },
  );
};

// Exporta a função execute
module.exports = execute;
