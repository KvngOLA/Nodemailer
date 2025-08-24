const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const cron = require("node-cron");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const message = {
      from: `${process.env.FROM_NAME} <${process.env.USER_EMAIL}>,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.message,`
    };

    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);

    return info;
  } catch (error) {
    console.log(error);
    return error;
  }
};

cron.schedule("* * * * * *", async () => {
  /*
    if user is not verified, send email to them
    const unverified = await UserModel.find({verfied: false});
    for(let i=0; i < unverified.length; i++;){
        sendMail(transporter, mailOptions);
    }

    */
  const message = {
    email: "aayomi@yopmail.com",
    subject: 'Server is down',
    message: 'Server is down',
  };
  await sendEmail(message);
});

module.exports = sendEmail;