/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint-disable @typescript-eslint/no-explicit-any*/
import "dotenv/config";
import nodemailer, { SendMailOptions, SentMessageInfo } from "nodemailer";
const hbs = require("nodemailer-express-handlebars");

const MAIL_HOST = process.env.MAIL_HOST || "";
const MAIL_PORT = Number(process.env.MAIL_PORT) || 465;
const MAIL_USER = process.env.MAIL_USERNAME || "";
const MAIL_PASSWORD = process.env.MAIL_PASSWORD || "";

const mailingConfig = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  requireTLS: true,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(mailingConfig);

const fromEmail = "sekolabedev@gmail.com";

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      partialsDir: "./src/mailTemplates/partials",
      layoutsDir: "./src/mailTemplates/layouts",
      extname: ".hbs",
    },
    viewPath: "./src/mailTemplates/views",
    extName: ".hbs",
  })
);

/**
 * General function to sending email
 * @param email Object with Email interface
 * @returns
 */
export async function send_email(
  options: SendMailOptions
): Promise<{ ok: boolean; data?: SentMessageInfo; error?: string }> {
  try {
    const info = await transporter.sendMail(options);
    return { ok: true, data: info };
  } catch (error) {
    console.log("Error sending email: " + error);
    return { ok: false, error: error as string };
  }
}

export async function newTeacherEmail(
  mailData: any
): Promise<{ ok: boolean; data?: SentMessageInfo; error?: string }> {
  const context = {
    name: mailData.name,
    rawPassword: mailData.rawPassword,
    email: mailData.email,
  };
  const mailOptions = {
    from: fromEmail,
    to: mailData.email,
    subject: `Akun Sekoola Anda`,
    text: "Akun Sekoola Anda",
    template: "teacherAccount",
    context: context,
  };

  return await send_email(mailOptions);
}
