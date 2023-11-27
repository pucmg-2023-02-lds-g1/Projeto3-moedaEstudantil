// Importa a conexão com o servidor
import { connection } from "../../server";


/**
 * Executa uma consulta no banco de dados para atualizar as informações de um aluno com base no ID fornecido.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */

// Define a função execute
const execute = function (req, res) {
  // Executa uma query SQL para atualizar um registro na tabela empresa
  connection.query(
    `UPDATE empresa SET nome = "${req.body.nome}", cnpj = "${req.body.cnpj}", email = "${req.body.email}", senha = "${req.body.senha}" WHERE id = ${req.body.id};`,
    (err, rows, fields) => {
      // Se ocorrer um erro, retorna uma mensagem de erro
      if (err) {
        return res.json({
          tipo: "Erro de alteração",
          mensagem: err,
        });
      }

      // Se a atualização for bem-sucedida, retorna uma mensagem de sucesso
      return res.json({
        tipo: "Sucesso!",
        mensagem: "Usuario alterado",
        s: "funcionando",
      });
    },
  );
};

// Exporta a função execute
module.exports = execute;

