import nodemailer from 'nodemailer';

export async function sendPasswordResetConfirmationEmail(email: string) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or any email service you use
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"ShopBuddy Support" <support@shopbuddy.ng>',
    to: email,
    subject: 'Password Reset Successfully',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #333; color: #ffffff;">
              <img src="https://res.cloudinary.com/dngy8q2fj/image/upload/t_Profile/v1728331840/favicon_za2jok.svg" alt="ShopBuddy" style="width: 80px;">
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
                Your password has been successfully reset. If you did not make this change, please contact our support team immediately.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                If you have any questions or need further assistance, feel free to contact our support team.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                Thank you for using ShopBuddy!
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

  await transporter.sendMail(mailOptions);
}
