import { connection } from "../../server";

/**
 * Executa uma atualização no banco de dados para modificar os dados de um professor.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Executa uma consulta SQL para atualizar os dados do professor com base nos parâmetros da requisição
  connection.query(
    `UPDATE professor SET nome = "${req.body.nome}", cpf = "${req.body.cpf}", email = "${req.body.email}", senha = "${req.body.senha}", endereco = "${req.body.endereco}", rg = "${req.body.rg}", moedas = ${Number(req.body.moedas)}, Instituicao_id = ${Number(req.body.instituicao)} WHERE idProfessor = ${req.body.id};`,
    (err, rows, fields) => {
      // Trata quaisquer erros que ocorram durante a atualização
      if (err) {
        return res.json({
          tipo: "Erro de alteração",
          mensagem: err,
        });
      }

      // Responde com sucesso caso a atualização seja bem-sucedida
      return res.json({
        tipo: "Sucesso!",
        mensagem: "Usuário alterado com sucesso.",
        s: "funcionando",
      });
    },
  );
};

// Exporta a função execute
module.exports = execute;
