import { connection } from "../../server";

/**
 * Deleta um aluno do banco de dados.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  const { id } = req.body;

  const query = `DELETE from aluno WHERE idAluno = ${id};`;

  connection.query(query, (err, rows, fields) => {
    if (err) {
      return res.json({
        tipo: "Erro na hora de deletar",
        mensagem: err,
      });
    }

    return res.json({
      tipo: "Sucesso!",
      mensagem: "Aluno deletada com sucesso",
      s: "funcionando",
    });
  });
};

module.exports = execute;
