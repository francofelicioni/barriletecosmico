import nodemailer from "nodemailer";
import envs from "../config/envConfig.js"

export const sendMail = async (email, subject, message, template) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "fran.felicioni@gmail.com",
      pass: envs.GMAIL_PASS
    },
  });

  await transporter.sendMail({
    from: "fran.felicioni@gmail.com",
    to: email,
    subject,
    text: message,
    html: template,
  });
};
