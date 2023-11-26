import { connection } from "../../server";
const execute = function (req, res) {
  connection.query(
    `SELECT * FROM empresa WHERE id = ${req.body.id};`,
    (err, rows, fields) => {
      if (err) {
        return res.json({
          tipo: "Erro ao retornar dados da empresa",
          mensagem: err,
        });
      }
      if (rows[0] == null) {
        return res.json({
          tipo: "Erro ao retornar dados da empresa",
          mensagem: "O código da empresa logada está errado ou não existe",
        });
      }
      return res.json({
        empresa: {
          nome: rows[0].nome,
          cnpj: rows[0].cnpj,
          email: rows[0].email,
          senha: rows[0].senha,
        },
      });
    },
  );
};

module.exports = execute;

