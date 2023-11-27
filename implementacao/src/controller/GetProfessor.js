import { connection } from "../../server";

/**
 * Retorna os dados de todos os professores armazenados no banco de dados.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Executa uma consulta SQL para recuperar os dados de todos os professores.
  connection.query(`SELECT * FROM Professor;`, (err, rows, fields) => {
    if (err) {
      // Se ocorrer um erro, retorna uma mensagem de erro.
      return res.json({
        tipo: "Erro ao retornar dados do Professor",
        mensagem: err,
      });
    }

    // Se não houver erros, retorna os dados dos professores.
    return res.json({
      empresas: rows,
    });
  });
};

module.exports = execute;
