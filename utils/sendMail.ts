require("dotenv").config();

import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

//which user acess the course so give acctivate email on current user email
const sendMail = async (options: EmailOptions): Promise<void> => {
  // const transporter: Transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: parseInt(process.env.SMTP_PORT || "587"),
  //   service: process.env.SMTP_SERVICE,
  //   auth: {
  //     user: process.env.SMTP_EMAIL, //5440
  //     pass: process.env.SMTP_PASSWORD,
  //     // username: process.env.SMTP_NAME,
  //   },
  // });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const { email, subject, template, data } = options;

  const templatePath = path.join(__dirname, "../mails", template);

  const html: string = await ejs.renderFile(templatePath, data);

  // const mailOptions = {
  //   from: process.env.SMTP_EMAIL,
  //   to: email,
  //   subject,
  //   html,
  // };
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};

export default sendMail;
