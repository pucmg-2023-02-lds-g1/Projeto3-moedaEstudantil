const { connection } = require("../../server");
const execute = function (req, res) {
    connection.query(`SELECT * FROM vantagens_has_Aluno WHERE Aluno_idAluno = ?;`, [req.body.id], (err, vantagemAlunoRows, fields) => {
      if (err) {
        return res.json({
          tipo: "Erro ao retornar vantagens do aluno",
          mensagem: err
        });
      }
  
      const vantagensAluno = vantagemAlunoRows;
  
      if (vantagensAluno.length === 0) {
        return res.json({
          vantagens: []
        });
      }
  
      const vantagemIDs = vantagensAluno.map(vantagem => vantagem.Vantagens_idVantagem);
      const vantagemIDsString = vantagemIDs.join(',');
  
      connection.query(`SELECT * FROM Vantagens WHERE idVantagem IN (${vantagemIDsString});`, (err, vantagemRows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro ao retornar informações das vantagens",
            mensagem: err
          });
        }
  
        const vantagemMap = {};
        vantagemRows.forEach(vantagem => {
          vantagemMap[vantagem.idVantagem] = vantagem;
        });
  
        const vantagensComInfo = vantagensAluno.map(vantagemAluno => {
          const vantagem = vantagemMap[vantagemAluno.Vantagens_idVantagem];
          return {
            ...vantagemAluno,
            vantagemInfo: vantagem
          };
        });
  
        return res.json({
          vantagens: vantagensComInfo
        });
      });
    });
  }

module.exports = execute;