import nodemailer from "nodemailer";

// Define o endereço de email e a senha do remetente
const user = "pedro.ramos@incentivecoinscoins.com";
const pass = "PePe@1204@123";

/**
 * Envia um email usando o serviço de transporte Nodemailer.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 */
const execute = function (req, res) {
  // Cria um objeto de transporte com as credenciais do remetente
  const transporter = nodemailer.createTransport({
    host: "smtp.umbler.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  // Envia o email
  transporter
    .sendMail({
      from: user,
      to: user,
      subject: "oi",
      text: "oi",
    })
    .then((info) => {
      res.send(info);
    })
    .catch((error) => {
      res.send(error);
    });
};

// Exporta a função execute
module.exports = execute;
