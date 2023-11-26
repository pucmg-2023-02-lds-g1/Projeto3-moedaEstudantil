import nodemailer from "nodemailer";
const user = "pedro.ramos@incentivecoinscoins.com";
const pass = "PePe@1204@123";

const execute = function (req, res) {
  const transporter = nodemailer.createTransport({
    host: "smtp.umbler.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });

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

module.exports = execute;

