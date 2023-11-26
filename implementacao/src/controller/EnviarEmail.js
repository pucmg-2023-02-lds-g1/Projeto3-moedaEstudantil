const nodemailer = require("nodemailer");


const execute = async function (req, res) {
    const { destinatario, assunto, corpo } = req.body;
  
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'moedaestudantil@gmail.com',
        pass: 'ttpk hrde yqoz qaoa',    //NAO ALTERAR ESSE CAMPO
      },
    });
  
    const mailOptions = {
      from: 'moedaestudantil@gmail.com',
      to: destinatario,
      subject: assunto,
      text: corpo,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ tipo: 'Erro ao enviar o e-mail' });
      } else {
        console.log('E-mail enviado: ' + info.response);
        res.json({ tipo: 'E-mail enviado com sucesso' });
      }
    });
  }

module.exports = execute;