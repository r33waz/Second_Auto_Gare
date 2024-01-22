"use strict"
import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.forwardemail.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.USERNAME,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email was not sent");
    console.error(error);
  }
};
