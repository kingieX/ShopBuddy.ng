// utils/sendVerificationEmail.ts
import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // client route verification
  const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/auth/verify?token=${token}`;

  const mailOptions = {
    from: '"ShopBuddy" <no-reply@shopbuddy.ng>',
    to: email,
    subject: 'Verify your email',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #333; color: #ffffff;">
            <img src="https://res.cloudinary.com/dngy8q2fj/image/upload/t_Profile/v1728331840/favicon_za2jok.svg" alt="ShopBuddy" style="width: 80px;">
              <h1 style="margin: 0; font-size: 30px;">ShopBuddy</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; color: #333;">
              <p style="font-size: 16px; line-height: 1.6;">
                Hi there,
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                Thank you for signing up for ShopBuddy! To complete your registration, please verify your email by clicking the button below:
              </p>
              <p style="text-align: center; margin: 20px 0;">
                <a href="${verificationUrl}" 
                   style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                   Verify Your Email
                </a>
              </p>
              <p style="font-size: 14px; line-height: 1.6;">
                If you didn’t sign up for a ShopBuddy account, please disregard this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; background-color: #f4f4f4; text-align: center; color: #888;">
              <p style="font-size: 12px;">
                &copy; 2024 ShopBuddy. All rights reserved.<br>
                No-reply@shopbuddy.ng | <a href="https://shopbuddy.ng" style="color: #007bff; text-decoration: none;">Visit our website</a>
              </p>
            </td>
          </tr>
        </table>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending verification email.');
  }
};
