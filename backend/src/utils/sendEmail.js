
import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
  console.log(process.env.USER_NAME)
  console.log(process.env.PASSWORD)
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service:process.env.SERVICE,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.USER_NAME,
        pass: process.env.PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.USER_NAME,
      to: email,
      subject: subject,
      html: text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email was not sent");
    console.error(error);
  }
};
