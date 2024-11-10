// lib/email.ts

import nodemailer from 'nodemailer';

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or use your preferred email service
  auth: {
    user: process.env.EMAIL_USER, // Your email here
    pass: process.env.EMAIL_PASS, // Your email password here
  },
});

// Function to send the order status update email
export const sendOrderStatusUpdateEmail = async (
  recipientEmail: string,
  orderId: string,
  status: string
) => {
  let subject: string;
  let statusColor: string;
  let statusText: string;
  let htmlContent: string;

  const Logo = process.env.EMAIL_LOGO;

  // Set the status color, subject, and email content based on the order status
  switch (status) {
    case 'PENDING':
      statusColor = '#FFEB3B'; // Yellow
      statusText = 'Pending';
      subject = `Your Order #${orderId} is Pending`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px;">
          <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #333; color: #ffffff;">
              <img src=${Logo} alt="ShopBuddy" style="width: 180px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; color: #333;">
                <p style="font-size: 16px; line-height: 1.6;">
                  Hello,
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  We wanted to let you know that the status of your order <strong>#${orderId}</strong> is now <strong style="color: ${statusColor};">${statusText}</strong>.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Please check back later for updates on the progress of your order.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Best regards,<br/>
                  The Team at ShopBuddy
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
      `;
      break;

    case 'PAID':
      statusColor = '#4CAF50'; // Green
      statusText = 'Paid';
      subject = `Your Order #${orderId} has been Paid`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px;">
          <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #333; color: #ffffff;">
              <img src=${Logo} alt="ShopBuddy" style="width: 180px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; color: #333;">
                <p style="font-size: 16px; line-height: 1.6;">
                  Hello,
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  We are pleased to inform you that your payment for order <strong>#${orderId}</strong> has been successfully processed.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Your order is now being prepared for shipment. You will receive another notification when it's on its way!
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Best regards,<br/>
                  The Team at ShopBuddy
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
      `;
      break;

    case 'INPROGRESS':
      statusColor = '#FF9800'; // Orange
      statusText = 'In Progress';
      subject = `Your Order #${orderId} is In Progress`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px;">
          <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #333; color: #ffffff;">
              <img src=${Logo} alt="ShopBuddy" style="width: 180px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; color: #333;">
                <p style="font-size: 16px; line-height: 1.6;">
                  Hello,
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Your order <strong>#${orderId}</strong> is now being processed. We are working hard to prepare it for shipment.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  You'll receive an update once your order has shipped.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Best regards,<br/>
                  The Team at ShopBuddy
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
      `;
      break;

    case 'SHIPPED':
      statusColor = '#3F51B5'; // Indigo
      statusText = 'Shipped';
      subject = `Your Order #${orderId} Has Been Shipped`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px;">
          <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #333; color: #ffffff;">
              <img src=${Logo} alt="ShopBuddy" style="width: 180px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; color: #333;">
                <p style="font-size: 16px; line-height: 1.6;">
                  Hello,
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Great news! Your order <strong>#${orderId}</strong> has been shipped and is on its way to you.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  You will receive another update when it's out for delivery.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Best regards,<br/>
                  The Team at ShopBuddy
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
      `;
      break;

    case 'DELIVERED':
      statusColor = '#9C27B0'; // Purple
      statusText = 'Delivered';
      subject = `Your Order #${orderId} Has Been Delivered`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px;">
          <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #333; color: #ffffff;">
              <img src=${Logo} alt="ShopBuddy" style="width: 180px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; color: #333;">
                <p style="font-size: 16px; line-height: 1.6;">
                  Hello,
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  We are happy to inform you that your order <strong>#${orderId}</strong> has been delivered!
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  We hope you enjoy your purchase. If you have any questions or concerns, feel free to contact us.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Best regards,<br/>
                  The Team at ShopBuddy
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
      `;
      break;

    case 'CANCELED':
      statusColor = '#F44336'; // Red
      statusText = 'Canceled';
      subject = `Your Order #${orderId} Has Been Canceled`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px;">
          <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #333; color: #ffffff;">
              <img src=${Logo} alt="ShopBuddy" style="width: 180px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; color: #333;">
                <p style="font-size: 16px; line-height: 1.6;">
                  Hello,
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  We're sorry to inform you that your order <strong>#${orderId}</strong> has been canceled.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  If you have any questions or concerns, feel free to reach out to our customer support team.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Best regards,<br/>
                  The Team at ShopBuddy
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
      `;
      break;

    default:
      statusColor = '#9E9E9E'; // Gray for unknown status
      statusText = 'Unknown Status';
      subject = `Your Order #${orderId} Status Update`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px;">
          <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #333; color: #ffffff;">
              <img src=${Logo} alt="ShopBuddy" style="width: 180px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; color: #333;">
                <p style="font-size: 16px; line-height: 1.6;">
                  Hello,
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  The status of your order <strong>#${orderId}</strong> has been updated to <strong>${statusText}</strong>.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Please check back for further updates.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Best regards,<br/>
                  The Team at ShopBuddy
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
      `;
      break;
  }

  // Send the email
  const mailOptions = {
    from: '"ShopBuddy" <no-reply@shopbuddy.ng>',
    to: recipientEmail,
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
