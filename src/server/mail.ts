import nodemailer from "nodemailer";

export async function sendEmail(input: {
  htmlContent: string;
  sendFromName: string;
  subject: string;
  recipients: string[];
}) {
  //   const testAccount = await nodemailer.createTestAccount();

  //   const transporter = nodemailer.createTransport({
  //     host: "smtp.ethereal.email",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: testAccount.user,
  //       pass: testAccount.pass,
  //     },
  //   });

  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);

  input.recipients.forEach((email) => {
    async function send() {
      const info = await transporter.sendMail({
        from: `${input.sendFromName} <j.doe@example.com>`,
        to: email,
        subject: input.subject,
        text: "Plaintext version of the message",
        html: input.htmlContent, //`<h1>Hello!</h1>`
      });
    }
    send();
  });

  console.log(`Email sent!`);
}
