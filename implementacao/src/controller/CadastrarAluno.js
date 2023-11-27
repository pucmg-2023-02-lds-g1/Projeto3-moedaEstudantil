import { connection } from "../../server";

/**
 * Insere um novo aluno no banco de dados.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  const { nome, senha, email, cpf, endereco, instituicao } = req.body;

  const query = `INSERT INTO aluno VALUES (NULL, "${nome}", "${senha}", "${email}", "${cpf}", 000000,  "${endereco}", 0, 1, ${instituicao});`;

  connection.query(query, (err, rows, fields) => {
    if (err) {
      return res.json({
        tipo: "Erro de cadastro",
        mensagem: err,
      });
    }

    return res.json({
      tipo: "Sucesso!",
      mensagem: "Usuario cadastrado",
      s: "funcionando",
    });
  });
};

module.exports = execute;
