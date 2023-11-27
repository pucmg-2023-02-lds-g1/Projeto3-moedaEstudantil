import { connection } from "../../server";

/**
 * Executa consultas no banco de dados para obter informações sobre as vantagens associadas a um aluno.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Consulta as vantagens associadas ao aluno com base no id do aluno fornecido na requisição
  connection.query(
    `SELECT * FROM vantagens_has_Aluno WHERE Aluno_idAluno = ?;`,
    [req.body.id],
    (err, vantagemAlunoRows, fields) => {
      // Trata quaisquer erros que ocorram durante a consulta
      if (err) {
        return res.json({
          tipo: "Erro ao retornar vantagens do aluno",
          mensagem: err,
        });
      }

      // Armazena as vantagens associadas ao aluno
      const vantagensAluno = vantagemAlunoRows;

      // Se não houver vantagens associadas ao aluno, responde com uma lista vazia
      if (vantagensAluno.length === 0) {
        return res.json({
          vantagens: [],
        });
      }

      // Obtém os IDs das vantagens associadas ao aluno
      const vantagemIDs = vantagensAluno.map(
        (vantagem) => vantagem.Vantagens_idVantagem,
      );
      const vantagemIDsString = vantagemIDs.join(",");

      // Consulta as informações das vantagens com base nos IDs obtidos
      connection.query(
        `SELECT * FROM Vantagens WHERE idVantagem IN (${vantagemIDsString});`,
        (err, vantagemRows, fields) => {
          // Trata quaisquer erros que ocorram durante a consulta das informações das vantagens
          if (err) {
            return res.json({
              tipo: "Erro ao retornar informações das vantagens",
              mensagem: err,
            });
          }

          // Mapeia as informações das vantagens por ID
          const vantagemMap = {};
          vantagemRows.forEach((vantagem) => {
            vantagemMap[vantagem.idVantagem] = vantagem;
          });

          // Combina as informações das vantagens com as vantagens associadas ao aluno
          const vantagensComInfo = vantagensAluno.map((vantagemAluno) => {
            const vantagem = vantagemMap[vantagemAluno.Vantagens_idVantagem];
            return {
              ...vantagemAluno,
              vantagemInfo: vantagem,
            };
          });

          // Responde com as vantagens e suas informações
          return res.json({
            vantagens: vantagensComInfo,
          });
        },
      );
    },
  );
};

// Exporta a função execute
module.exports = execute;
