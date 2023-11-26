import { connection } from "../../server";
const execute = function (req, res) {
  connection.query(
    `UPDATE professor SET nome = "${req.body.nome}", cpf = "${
      req.body.cpf
    }", email = "${req.body.email}", senha = "${req.body.senha}", endereco = "${
      req.body.endereco
    }", rg = "${req.body.rg}", moedas = ${Number(
      req.body.moedas,
    )}, Instituicao_id = ${Number(req.body.instituicao)} WHERE idProfessor = ${
      req.body.id
    };`,
    (err, rows, fields) => {
      if (err) {
        return res.json({
          tipo: "Erro de alteração",
          mensagem: err,
        });
      }

      return res.json({
        tipo: "Sucesso!",
        mensagem: "Usuario alterado",
        s: "funcionando",
      });
    },
  );
};

module.exports = execute;

