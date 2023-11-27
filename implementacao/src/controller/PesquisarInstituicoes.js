import { connection } from "../../server";

/**
 * Executa uma consulta no banco de dados para retornar todas as instituições.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Cria um array vazio para armazenar os resultados
  var instituicoes = [];

  // Consulta o banco de dados para todas as linhas na tabela instituicao
  connection.query("SELECT * FROM instituicao", (err, rows, fields) => {
    // Trata quaisquer erros que ocorram durante a consulta
    if (err) {
      return res.json({
        tipo: "Erro",
        mensagem: err,
      });
    } else {
      // Loop através de cada linha e adiciona-a ao array instituicoes
      for (let i = 0; i < rows.length; i++) {
        instituicoes.push({
          id: rows[i].id,
          nome: rows[i].nome,
        });
      }
    }

    // Envia o array instituicoes como uma resposta JSON
    res.send(JSON.stringify(instituicoes));
  });
};

// Exporta a função execute
module.exports = execute;
