import { connection } from "../../server";

/**
 * Deleta uma empresa do banco de dados.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  const { id } = req.body;

  const query = `DELETE from empresa WHERE id = ${id};`;

  connection.query(query, (err, rows, fields) => {
    if (err) {
      return res.json({
        tipo: "Erro na hora de deletar",
        mensagem: err,
      });
    }

    return res.json({
      tipo: "Sucesso!",
      mensagem: "Empresa deletada com sucesso",
      s: "funcionando",
    });
  });
};

module.exports = execute;
