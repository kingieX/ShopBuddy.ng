import nodemailer from 'nodemailer';

export async function sendContactFormEmail(
  name: string,
  email: string,
  phone: string,
  message: string
) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or your preferred email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"ShopBuddy Contact" <no-reply@shopbuddy.ng>',
    to: process.env.OFFICIAL_EMAIL, // Replace with the official email
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #333; color: #ffffff;">
              <h1 style="margin: 0; font-size: 30px;">ShopBuddy - Contact Form</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; color: #333;">
              <h2 style="font-size: 24px; margin-bottom: 20px;">New Contact Form Submission</h2>
              <p style="font-size: 16px; line-height: 1.6;">
                <strong>Name:</strong> ${name}
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                <strong>Email:</strong> ${email}
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                <strong>Phone:</strong> ${phone}
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                <strong>Message:</strong> ${message}
              </p>
            </td>
          </tr>
        </table>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendUserConfirmationEmail(userEmail: string) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"ShopBuddy Support" <no-reply@shopbuddy.ng>',
    to: userEmail, // The email address of the user who filled out the contact form
    subject: 'Your Contact Form Submission Received',
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
              <h2 style="font-size: 24px; margin-bottom: 20px;">Thank you for reaching out!</h2>
              <p style="font-size: 16px; line-height: 1.6;">
                Dear Customer,
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                We have received your message and will get back to you within 24 hours. Thank you for reaching out to ShopBuddy. We are always here to assist you with any questions or concerns.
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
