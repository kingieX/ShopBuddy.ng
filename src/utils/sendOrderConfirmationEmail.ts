// lib/email.ts

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or other email provider's service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderConfirmationEmail = async (
  recipientEmail: string,
  orderId: string,
  orderDetails: {
    items: Array<{ name: string; quantity: number; price: number }>;
    vat: number;
    deliveryFee: number;
    totalAmount: number;
    paymentStatus: string;
  }
) => {
  const itemsHtml = orderDetails.items
    .map(
      (item) =>
        `<li>${item.name} - Quantity: ${item.quantity}, Price: ₦${item.price.toFixed(2)}</li>`
    )
    .join('');

  const htmlContent = `
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
            <h2 style="font-size: 24px; margin-bottom: 20px;">Thank you for your purchase!</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              Your order <strong>#${orderId}</strong> has been confirmed, and your payment was successfully processed.
            </p>
            <h3 style="font-size: 18px; margin-bottom: 15px;">Order Summary</h3>
            <ul style="font-size: 16px; line-height: 1.6; padding-left: 20px;">
              ${itemsHtml}
            </ul>
            <p style="font-size: 16px; line-height: 1.6;">VAT (1.5%): ₦${orderDetails.vat.toFixed(2)}</p>
            <p style="font-size: 16px; line-height: 1.6;">Delivery Fee: ₦${orderDetails.deliveryFee.toFixed(2)}</p>
            <p style="font-size: 16px; line-height: 1.6;">Service charge: ₦1000</p>
            <p style="font-size: 16px; line-height: 1.6; font-weight: bold;">Total Amount: ₦${orderDetails.totalAmount.toFixed(2)}</p>
            <p style="font-size: 16px; line-height: 1.6;">Payment Status: <strong>${orderDetails.paymentStatus}</strong></p>
            <p style="font-size: 16px; line-height: 1.6;">
              We're thrilled to have you with us, and we hope you enjoy your new items. If you have any questions or need assistance, feel free to reach out.
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
  `;

  const mailOptions = {
    from: '"ShopBuddy" <no-reply@shopbuddy.ng>',
    to: recipientEmail,
    subject: `Order Confirmation - #${orderId}`,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};
