const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerifyOtpEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"Lunchpad" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verify Your Email - Lunchpad",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 12px;">
        <h2 style="color: #2E365A;">Verify Your Email</h2>
        <p style="color: #6B597F;">Use the OTP below to verify your account. It expires in <strong>15 minutes</strong>.</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #3F5B8D; text-align: center; padding: 16px 0;">
          ${otp}
        </div>
        <p style="color: #999; font-size: 12px;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
};

const sendResetOtpEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"Lunchpad" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset Your Password - Lunchpad",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 12px;">
        <h2 style="color: #2E365A;">Reset Your Password</h2>
        <p style="color: #6B597F;">Use the OTP below to reset your password. It expires in <strong>15 minutes</strong>.</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #3F5B8D; text-align: center; padding: 16px 0;">
          ${otp}
        </div>
        <p style="color: #999; font-size: 12px;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
};

module.exports = { sendVerifyOtpEmail, sendResetOtpEmail };
