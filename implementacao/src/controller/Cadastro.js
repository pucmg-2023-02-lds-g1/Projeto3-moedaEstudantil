import { connection } from "../../server";
const execute = function (req, res) {
  connection.query(
    `INSERT INTO elogio VALUES("${req.body.elogio}")`,
    (err, rows, fields) => {
      // Operação simples para testar o funcionamento
      if (err) {
        return res.json({
          tipo: "Erro de cadastro",
          mensagem: err,
        });
      }
    },
  );
};

module.exports = execute;

