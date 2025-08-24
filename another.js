// const dotenv = require("dotenv");
// dotenv.config();
// const nodemailer = require("nodemailer");
// const cron = require("node-cron");

// // console.log(process.env);

// const username = "ola";
// const confirmation_link = "https://example.com/98765dfghj";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.SMTP_EMAIL,
//     pass: process.env.SMTP_PASS,
//   },
// });

// const mailOptions = {
//   from: {
//     name: "Web wizard",
//     address: process.env.SMTP_EMAIL,
//   },
//   to: ["babadudu@yopmail.com", "temi@yopmail.com"],
//   subject: "Send email using nodemailer",
//   text: "Hello World!",
//   html: `
//   <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Signup Confirmation</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             background-color: #f4f4f4;
//             margin: 0;
//             padding: 0;
//         }
//         .container {
//             max-width: 600px;
//             margin: 50px auto;
//             background-color: #fff;
//             padding: 20px;
//             border: 1px solid #ddd;
//         }
//         h1 {
//             color: #333;
//             font-size: 24px;
//         }
//         p {
//             color: #666;
//             font-size: 16px;
//         }
//         .button {
//             display: inline-block;
//             padding: 10px 20px;
//             background-color: #28a745;
//             color: white;
//             text-decoration: none;
//             border-radius: 4px;
//         }
//         .footer {
//             text-align: center;
//             margin-top: 20px;
//             font-size: 12px;
//             color: #999;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <h1>Welcome to Our Platform!</h1>
//         <p>Hi ${username},</p>
//         <p>Thank you for signing up. Please click the button below to confirm your email address and complete your registration:</p>
//         <p><a href=${confirmation_link} class="button">Confirm Email</a></p>
//         <p>If you didn’t sign up for this account, please ignore this email.</p>
//         <div class="footer">
//             <p>© 2024 Your Company. All rights reserved.</p>
//         </div>
//     </div>
// </body>
// </html>

//   `,
// };

// const sendMail = async (transporter, mailOptions) => {
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Mail has been sent!");
//   } catch (err) {
//     console.log(err);
//   }
// };

// // sendMail(transporter, mailOptions);

// cron.schedule("* * * * *", () => {
//     /*
//     if user is not verified, send email to them
//     const unverified = await UserModel.find({verfied: false});
//     for(let i=0; i < unverified.length; i++;){
//         sendMail(transporter, mailOptions);
//     }

//     */
//   sendMail(transporter, mailOptions);
// });

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