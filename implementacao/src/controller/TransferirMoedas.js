import { connection } from "../../server";
const execute = function (req, res) {
  console.log("cheguei aki");
  const { professorId, alunoId, quantidade, descricao } = req.body;

  // Verificar se o professor tem moedas suficientes
  const sqlVerificar = `SELECT moeda FROM Professor WHERE idProfessor = ?;`;
  connection.query(sqlVerificar, professorId, (err, results) => {
    if (err) throw err;

    if (results.length === 0 || results[0].moeda < quantidade) {
      return res.status(400).send("O professor não tem moedas suficientes");
    }

    // Deduzir moedas do professor
    const sqlTransferirProfessor = `UPDATE Professor SET moeda = moeda - ? WHERE idProfessor = ?;`;
    connection.query(
      sqlTransferirProfessor,
      [quantidade, professorId],
      (err, results) => {
        if (err) throw err;

        // Adicionar moedas ao aluno
        const sqlTransferirAluno = `UPDATE Aluno SET moeda = moeda + ? WHERE idAluno = ?;`;
        connection.query(
          sqlTransferirAluno,
          [quantidade, alunoId],
          (err, results) => {
            if (err) throw err;

            // Registrar a transação
            const sqlTransacao = `INSERT INTO transacoes (Professor_idProfessor, Aluno_idAluno, valor, descricao) VALUES (?, ?, ?, ?);`;
            connection.query(
              sqlTransacao,
              [professorId, alunoId, quantidade, descricao],
              (err, results) => {
                if (err) throw err;

                res.send("Transferência de moedas realizada com sucesso!");
              },
            );
          },
        );
      },
    );
  });
};

module.exports = execute;

