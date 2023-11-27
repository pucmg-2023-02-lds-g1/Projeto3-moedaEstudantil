import { connection } from "../../server";

/**
 * Insere uma nova vantagem para um aluno no banco de dados.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  const { idVantagem, idAluno, valorF } = req.body;

  const insertQuery = "INSERT INTO Vantagens_has_Aluno (Vantagens_idVantagem, Aluno_idAluno) values (?, ?)";
  const updateQuery = "update aluno set moeda = ? where idAluno = ?";

  connection.query(insertQuery, [idVantagem, idAluno], (err, rows, fields) => {
    if (err) {
      return res.json({
        tipo: "Você já comprou essa vantagem",
        mensagem: err,
      });
    } else {
      connection.query(updateQuery, [valorF, idAluno], (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro ao comprar a vantagem",
            mensagem: err,
          });
        }

        return res.json({
          tipo: "Vantagem comprada",
        });
      });
    }
  });
};

module.exports = execute;
