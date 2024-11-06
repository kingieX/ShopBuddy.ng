import nodemailer from 'nodemailer';

export async function sendPasswordResetConfirmationEmail(email: string) {
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
    to: email, // The user's email address
    subject: 'Password Reset Successful',
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
              <h2 style="font-size: 24px; margin-bottom: 20px;">Password Reset Successful</h2>
              <p style="font-size: 16px; line-height: 1.6;">
                Hello,
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                We are writing to confirm that your password has been successfully reset. If you made this change, no further action is required.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                However, if you did not initiate this password reset or suspect any unauthorized activity, please reach out to our support team immediately.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                Our team is always here to assist you. Feel free to contact us at any time if you have any further questions or need support.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                Thank you for choosing ShopBuddy!
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; background-color: #f4f4f4; text-align: center; color: #888;">
              <p style="font-size: 12px;">
                &copy; 2024 ShopBuddy. All rights reserved.<br>
                <a href="mailto:support@shopbuddy.ng" style="color: #007bff; text-decoration: none;">support@shopbuddy.com</a> | <a href="https://shopbuddy.ng" style="color: #007bff; text-decoration: none;">Visit our website</a>
              </p>
            </td>
          </tr>
        </table>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
