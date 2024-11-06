import nodemailer from 'nodemailer';

export async function sendWelcomeMessageEmail(email: string) {
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
    subject: 'Welcome to ShopBuddy!',
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
              <h2 style="font-size: 24px; margin-bottom: 20px;">Welcome to ShopBuddy!</h2>
              <p style="font-size: 16px; line-height: 1.6;">
                We're thrilled to have you on board! At ShopBuddy, we aim to provide a seamless and enjoyable shopping experience, offering a wide range of products just for you.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                Here's what you can expect from us:
              </p>
              <ul style="font-size: 16px; line-height: 1.6; padding-left: 20px;">
                <li>A diverse selection of quality products at competitive prices</li>
                <li>Exclusive promotions and discounts</li>
                <li>Easy and secure checkout process</li>
                <li>Fast and reliable customer service</li>
              </ul>
              <p style="font-size: 16px; line-height: 1.6;">
                We’re here to make sure your shopping experience is exceptional. If you have any questions or need assistance, don't hesitate to reach out to our support team.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                Happy shopping, and welcome to the ShopBuddy community!
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; background-color: #f4f4f4; text-align: center; color: #888;">
              <p style="font-size: 12px;">
                &copy; 2024 ShopBuddy. All rights reserved.<br>
                <a href="mailto:support@shopbuddy.ng" style="color: #007bff; text-decoration: none;">support@shopbuddy.ng</a> | <a href="https://shopbuddy.ng" style="color: #007bff; text-decoration: none;">Visit our website</a>
              </p>
            </td>
          </tr>
        </table>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
