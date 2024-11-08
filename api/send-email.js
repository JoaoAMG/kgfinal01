const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { firstname, lastname, email, number, local, assunto } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 465,
      secure: true,
      auth: {
        user: 'support@kingsgel.com',
        pass: '#KGpq316#',
      },
    });

    const mailOptions = {
      from: 'support@kingsgel.com',
      to: 'support@kingsgel.com',
      replyTo: email,
      subject: `Novo contato de ${firstname} ${lastname}`,
      text: `Nome: ${firstname} ${lastname}\nE-mail: ${email}\nCelular: ${number}\nLocal: ${local}\nAssunto: ${assunto}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'E-mail enviado com sucesso!', info });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao enviar o e-mail' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
};
