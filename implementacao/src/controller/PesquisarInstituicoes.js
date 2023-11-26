import { connection } from "../../server";
const execute = function (req, res) {
  var instituicoes = [];

  connection.query("SELECT * FROM instituicao", (err, rows, fields) => {
    if (err) {
      return res.json({
        tipo: "Erro",
        mensagem: err,
      });
    } else {
      for (let i = 0; i < rows.length; i++) {
        instituicoes.push({
          id: rows[i].id,
          nome: rows[i].nome,
        });
      }
    }
    res.send(JSON.stringify(instituicoes));
  });
};

module.exports = execute;

