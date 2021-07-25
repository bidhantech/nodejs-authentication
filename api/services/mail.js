"use strict";
const nodemailer = require("nodemailer");

async function main(options) {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      })
  
    await transporter.sendMail({
      from: process.env.SENDER_ADDRESS, // sender address
      to: options.to, // list of receivers
      subject: options.subject, // Subject line
      text: options.text || null, // plain text body
      html: options.html || null, // html body
    });
  }
const sendMail = async (options) => {
    try {
        await main(options)
    } catch(error) {
        console.log(error.message)
    }
}

module.exports = {
    sendMail
}