const nodemailer = require('nodemailer');

const rowSubject = {
  welcome: 'Bem-vindo',
  forgotPasswprd: 'Esqueci minha senha',
  billToVencer: 'Boleto a vencer',
  latePayment: 'Pagamento atrasado',
};

type TypeSubject =
  | 'welcome'
  | 'forgotPasswprd'
  | 'billToVencer'
  | 'latePayment';

async function main(data: {
  to: string;
  subject: TypeSubject;
  message: string;
}) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: data.to,
    subject: rowSubject[data.subject],
    text: data.message,
    html: '<b>Application by Dev Credas</b>',
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

export default main;
