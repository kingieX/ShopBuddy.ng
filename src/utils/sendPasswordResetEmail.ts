import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
) {
  try {
    const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Or any email service you use
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const Logo = process.env.EMAIL_LOGO;

    const mailOptions = {
      from: '"ShopBuddy" <no-reply@shopbuddy.ng>',
      to: email,
      subject: 'Password Reset Request',
      html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px;">
            <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #333; color: #ffffff;">
                  <img src=${Logo} alt="ShopBuddy" style="width: 80px;">
                  <h1 style="margin: 0; font-size: 30px;">ShopBuddy</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; color: #333;">
                  <p style="font-size: 16px; line-height: 1.6;">
                    Hello,
                  </p>
                  <p style="font-size: 16px; line-height: 1.6;">
                    You have requested a password reset. Please click the button below to reset your password:
                  </p>
                  <p style="text-align: center; margin: 20px 0;">
                    <a href="${resetLink}" 
                       style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                       Reset Password
                    </a>
                  </p>
                  <p style="font-size: 14px; line-height: 1.6;">
                    If you did not request a password reset, please ignore this email. This link will expire in 30 minutes.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; background-color: #f4f4f4; text-align: center; color: #888;">
                  <p style="font-size: 12px;">
                    &copy; 2024 ShopBuddy. All rights reserved.<br>
                    support@shopbuddy.ng | <a href="https://shopbuddy.ng" style="color: #007bff; text-decoration: none;">Visit our website</a>
                  </p>
                </td>
              </tr>
            </table>
          </div>
        `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Could not send password reset email');
  }
}
