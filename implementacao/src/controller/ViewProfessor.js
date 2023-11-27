import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para obter informações de um professor com base no ID fornecido.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Consulta o banco de dados para obter informações do professor com base no ID fornecido na requisição
  connection.query(
    `SELECT * FROM professor WHERE idProfessor = ${req.body.id};`,
    (err, rows, fields) => {
      // Trata quaisquer erros que ocorram durante a consulta
      if (err) {
        return res.json({
          tipo: "Erro ao retornar dados do professor",
          mensagem: err,
        });
      }

      // Verifica se a consulta retornou algum resultado
      if (rows.length === 0) {
        return res.json({
          tipo: "Erro ao retornar dados do professor",
          mensagem:
            "O código do professor logado está incorreto ou não existe no banco de dados",
        });
      }

      // Responde com as informações do professor obtidas da consulta
      return res.json({
        professor: {
          nome: rows[0].nome,
          cpf: rows[0].cpf,
          email: rows[0].email,
          senha: rows[0].senha,
          endereco: rows[0].endereco,
          rg: rows[0].rg,
          moedas: rows[0].moedas,
          instituicao: rows[0].Instituicao_id,
        },
      });
    },
  );
};

// Exporta a função execute
module.exports = execute;
