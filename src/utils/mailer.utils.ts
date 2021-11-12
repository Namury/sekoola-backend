import nodemailer from "nodemailer";

import "dotenv/config";

export const transporter = nodemailer.createTransport({
  host: String(process.env.MAIL_HOST),
  port: Number(process.env.MAIL_PORT),
  secure: true,
  requireTLS: true,
  auth: {
    user: String(process.env.MAIL_USERNAME),
    pass: String(process.env.MAIL_PASSWORD),
  },
  logger: true,
});
