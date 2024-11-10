// lib/email.ts

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or other email provider's service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL;

export const sendOrderNotificationEmailToOwner = async (
  orderId: string,
  orderDetails: {
    items: Array<{ name: string; quantity: number; price: number }>;
    vat: number;
    deliveryFee: number;
    totalAmount: number;
    paymentStatus: string;
    customerEmail: string; // Customer's email for reference
  }
) => {
  const itemsHtml = orderDetails.items
    .map(
      (item) =>
        `<li>${item.name} - Quantity: ${item.quantity}, Price: ₦${item.price.toFixed(2)}</li>`
    )
    .join('');

  const Logo = process.env.EMAIL_LOGO;

  const Admin = 'www.shopbuddy.ng/admin';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #333; color: #ffffff;">
            <img src=${Logo} alt="ShopBuddy" style="width: 180px;">
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; color: #333;">
            <h2 style="font-size: 24px; margin-bottom: 20px;">New Order Received - Order #${orderId}</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              A new order has been successfully paid for and is awaiting processing.
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
              Customer Email: <strong>${orderDetails.customerEmail}</strong>
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Please begin processing the order and preparing for shipment. Update order status on the dashboard: <button style="padding: 10px 20px; color: #1600A0"><a href=${Admin}>ShopBuddy Dashboard</a><button>
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
    to: OFFICIAL_EMAIL,
    subject: `New Order Received - Order #${orderId}`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to owner successfully:', info);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
