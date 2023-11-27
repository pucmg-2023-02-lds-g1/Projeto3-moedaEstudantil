import { connection } from "../../server";

/**
 * Retorna todas as vantagens do banco de dados.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Cria um array vazio para armazenar os resultados
  var vantagens = [];

  // Consulta o banco de dados para todas as linhas na tabela vantagens
  connection.query(`SELECT * FROM vantagens;`, (err, rows, fields) => {
    // Trata quaisquer erros que ocorram durante a consulta
    if (err) {
      return res.json({
        tipo: "Erro ao retornar vantagens",
        mensagem: err,
      });
    }

    // Verifica se a tabela está vazia
    if (rows[0] == null) {
      return res.json({
        tipo: "Tabela vazia",
        mensagem: "a tabela de vantangens não possui nenhum valor",
      });
    } else {
      // Loop através de cada linha e adiciona-a ao array vantagens
      for (let i = 0; i < rows.length; i++) {
        vantagens.push({
          idVantagem: rows[i].idVantagem,
          nome: rows[i].nome,
          descricao: rows[i].descricao,
          foto: rows[i].foto,
          empresa_id: rows[i].Empresa_id,
          preco: rows[i].Preco,
        });
      }
    }

    // Envia o array vantagens como uma resposta JSON
    res.send(JSON.stringify(vantagens));
  });
};

// Exporta a função execute
module.exports = execute;
