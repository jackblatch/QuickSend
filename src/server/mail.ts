import nodemailer from "nodemailer";

export function sendEmail(input: {
  htmlContent: string;
  sendFromName: string;
  subject: string;
  recipients: string[];
}) {
  //   const testAccount = await nodemailer.createTestAccount();

  // this is where the credentials would be inputted and then used to send on behalf of someone else
  //   const transporter = nodemailer.createTransport({
  //     host: "smtp.ethereal.email",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: testAccount.user,
  //       pass: testAccount.pass,
  //     },
  //   });

  const config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);

  input.recipients.forEach(async (email) => {
    async function send() {
      await transporter.sendMail({
        from: `${input.sendFromName} <j.doe@example.com>`,
        to: email,
        subject: input.subject,
        text: "Plaintext version of the message",
        html: input.htmlContent, //`<h1>Hello!</h1>`
      });
    }
    await send();
  });

  console.log(`Email sent!`);
}
