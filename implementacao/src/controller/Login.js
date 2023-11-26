import { connection } from "../../server";
const execute = function (req, res) {
  connection.query(
    `SELECT ${req.body.id} AS id FROM ${req.body.tabela} where email = "${req.body.email}" and senha = "${req.body.senha}" LIMIT 1;`,
    (err, rows, fields) => {
      if (err) {
        return res.json({
          tipo: "Erro ao retornar dados",
          mensagem: err,
        });
      }
      if (rows[0] == null) {
        return res.json({
          tipo: "Usuário não encontrado",
          mensagem: "Verifique os dados inseridos",
        });
      }
      return res.json({
        id: rows[0].id,
        s: "funcionando",
      });
    },
  );
};

module.exports = execute;

