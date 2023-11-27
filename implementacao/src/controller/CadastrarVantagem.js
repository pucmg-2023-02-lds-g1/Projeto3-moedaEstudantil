import { connection } from "../../server";

/**
 * Insere uma nova vantagem no banco de dados.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  const { nome, desc, url, idEmpresa, preco } = req.body;

  const query = `INSERT INTO vantagens (idVantagem, nome, descricao, foto, Empresa_id, Preco) values (default, "${nome}", "${desc}", "${url}", "${idEmpresa}", "${preco}");`;

  connection.query(query, (err, rows, fields) => {
    if (err) {
      return res.json({
        tipo: "Erro ao cadastrar a vantagem",
        mensagem: err,
      });
    }

    return res.json({
      transacoes: rows,
    });
  });
};

module.exports = execute;
