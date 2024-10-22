import nodemailer from 'nodemailer';

export async function sendAdminApprovalEmail(
  adminEmail: string,
  adminId: number
) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const approvalLink = `${process.env.NEXT_PUBLIC_URL}/adminAuth/auth/approve?adminId=${adminId}`;
  const rejectionLink = `${process.env.NEXT_PUBLIC_URL}/adminAuth/auth/reject?adminId=${adminId}`;

  const mailOptions = {
    from: '"ShopBuddy" <no-reply@shopbuddy.ng>',
    to: process.env.OFFICIAL_EMAIL,
    subject: 'New Admin Registration Approval Required',
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
              <h2 style="font-size: 24px; margin-bottom: 20px;">New Admin Registration</h2>
              <p style="font-size: 16px; line-height: 1.6;">
                A new admin has registered with the email <strong>${adminEmail}</strong>.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                Please review and approve or reject this request:
              </p>
              <p style="text-align: center;">
                <a href="${approvalLink}" style="background-color: #28a745; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Approve Admin</a>
                &nbsp;&nbsp;
                <a href="${rejectionLink}" style="background-color: #dc3545; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Reject Admin</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; background-color: #f4f4f4; text-align: center; color: #888;">
              <p style="font-size: 12px;">
                &copy; 2024 ShopBuddy. All rights reserved.<br>
                <a href="mailto:support@shopbuddy.ng" style="color: #007bff; text-decoration: none;">support@shopbuddy.ng</a> | 
                <a href="https://shopbuddy.ng" style="color: #007bff; text-decoration: none;">Visit our website</a>
              </p>
            </td>
          </tr>
        </table>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
