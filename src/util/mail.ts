import * as nodemailer from "nodemailer";
import env from "../util/validateEnv";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, //true for only 465
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
});

export const sendVerifyMail = async (mail: string, link: string) => {
  try {
    await transporter.sendMail({
      from: {
        name: "Mordecai ve Rigby",
        address: env.MAIL_USER,
      },
      to: [mail],
      subject: "Hesabını onayla ki girebilesin",
      html: `<a href="${link}">hesabını onaylamak için tıkla</a>`,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const sendOrderMail = async (mail: string, order:string) => {
  try {
    await transporter.sendMail({
      from: {
        name: "Fin ve Jack",
        address: env.MAIL_USER,
      },
      to: [mail],
      subject: "Ne kadar çok şey satın aldın",
      html: `<p>${order}</p>`,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
