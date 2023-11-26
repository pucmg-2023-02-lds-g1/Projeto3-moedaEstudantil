const { connection } = require("../../server");
const execute = function (req, res) {
    var vantagens = [];
    connection.query(`SELECT * FROM vantagens;`,
      (err, rows, fields) => {
        if (err) {
          return res.json({
            tipo: "Erro ao retornar vantagens",
            mensagem: err
          })
        }
        if (rows[0] == null) {
          return res.json({
            tipo: "Tabela vazia",
            mensagem: "a tabela de vantangens não possui nenhum valor"
          })
        } else {
          for (let i = 0; i < rows.length; i++) {
            vantagens.push({
              idVantagem: rows[i].idVantagem,
              nome: rows[i].nome,
              descricao: rows[i].descricao,
              foto: rows[i].foto,
              empresa_id: rows[i].Empresa_id,
              preco: rows[i].Preco
            });
          }
        }
        res.send(JSON.stringify(vantagens));
      })
  }

module.exports = execute;