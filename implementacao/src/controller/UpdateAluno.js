import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para atualizar as informações de um aluno com base no ID fornecido.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Executa a consulta no banco de dados
  connection.query(
    `UPDATE aluno SET nome = "${req.body.nome}", cpf = "${
      req.body.cpf
    }", email = "${req.body.email}", senha = "${req.body.senha}", endereco = "${
      req.body.endereco
    }", Instituicao_id = ${Number(
      req.body.instituicao,
    )}, Curso_idCurso = ${Number(req.body.curso)} WHERE idAluno = ${
      req.body.id
    };`,
    (err, rows, fields) => {
      // Trata quaisquer erros que ocorram durante a consulta
      if (err) {
        return res.json({
          tipo: "Erro de alteração",
          mensagem: err,
        });
      }

      // Retorna uma mensagem de sucesso
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
