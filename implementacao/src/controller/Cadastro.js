import { connection } from "../../server";

/**
 * Insere um novo elogio no banco de dados.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  const { elogio } = req.body;

  const query = `INSERT INTO elogio VALUES("${elogio}")`;

  connection.query(query, (err, rows, fields) => {
    // Operação simples para testar o funcionamento
    if (err) {
      return res.json({
        tipo: "Erro de cadastro",
        mensagem: err,
      });
    }
  });
};

module.exports = execute;
