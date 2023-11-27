import { connection } from "../../server";

/**
 * Insere uma nova empresa no banco de dados.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  const { nome, cnpj, email, senha } = req.body;

  const query = `INSERT INTO empresa (nome, cnpj, email, senha) VALUES ("${nome}", "${cnpj}", "${email}", "${senha}");`;

  connection.query(query, (err, rows, fields) => {
    if (err) {
      return res.json({
        tipo: "Erro de cadastro",
        mensagem: err,
      });
    }

    return res.json({
      tipo: "Sucesso!",
      mensagem: "Empresa cadastrada com sucesso",
      s: "funcionando",
    });
  });
};

module.exports = execute;
