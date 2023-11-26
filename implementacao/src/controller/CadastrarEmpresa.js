import { connection } from "../../server";
const execute = function (req, res) {
  connection.query(
    `INSERT INTO empresa (nome, cnpj, email, senha) VALUES ("${req.body.nome}", "${req.body.cnpj}", "${req.body.email}", "${req.body.senha}");`,
    (err, rows, fields) => {
      if (err) {
        return res.json({
          tipo: "Erro de cadastro",
          mensagem: err,
        });
      }

      return res.json({
        tipo: "Sucesso!",
        mensagem: "Empresa cadastrada com sucesso",
        s: "funcionando",
      });
    },
  );
};

module.exports = execute;

