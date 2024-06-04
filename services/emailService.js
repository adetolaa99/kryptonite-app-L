const nodemailer = require("nodemailer");
const emailConfig = require("../config/emailConfig.js");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailConfig.EMAIL,
    pass: emailConfig.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

const sendConfirmationEmail = async (to) => {
  const subject = "Registration Successful for Kryptonite App";
  const text =
    "Thank you for registering! You can now proceed to log in using your email and password and an OTP will be sent to your email.";
  const html = `
    <div style="font-family: Arial, sans-serif; margin: 20px;">
      <p>Thank you for registering!</p>
      <p>You can now proceed to log in using your email and password and an OTP will be sent to your email.</p>
      <p>If you did not register, please ignore this email.</p>
      <p>Thank you.</p>
    </div>`;

  const mailOptions = {
    from: emailConfig.EMAIL,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error occured while sending confirmation email:", error);
  }
};

const sendOtpEmail = async (to, otp) => {
  const subject = "Your One-Time Password (OTP)";
  const text = `Your OTP is: ${otp}`;
  const html = `
    <div style="font-family: Arial, sans-serif; margin: 20px;">
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>Please use this OTP to complete your login process. This OTP is valid for 5 minutes.</p>
      <p>If you did not request this OTP, please ignore this email.</p>
      <p>Thank you.</p>
    </div>
  `;

  const mailOptions = {
    from: emailConfig.EMAIL,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error occured while sending OTP email:", error);
  }
};

module.exports = {
  sendConfirmationEmail,
  sendOtpEmail,
};
