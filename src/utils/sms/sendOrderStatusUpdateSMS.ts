// utils/sendOrderStatusUpdateSMS.ts

import { sendSMS } from './sendSMS';

export const sendOrderStatusUpdateSMS = async (
  phoneNumber: string,
  orderId: string,
  status: string
) => {
  let message = '';

  // Customize the message based on the order status
  switch (status) {
    case 'PENDING':
      message = `Your order #${orderId} is now Pending. Please check back later for updates.`;
      break;
    case 'PAID':
      message = `Payment for your order #${orderId} has been confirmed and is being prepared for shipment.`;
      break;
    case 'INPROGRESS':
      message = `Your order #${orderId} is in progress. We're working on it!`;
      break;
    case 'SHIPPED':
      message = `Good news! Your order #${orderId} has been shipped and is on its way.`;
      break;
    case 'DELIVERED':
      message = `Your order #${orderId} has been delivered. Enjoy your purchase!`;
      break;
    case 'CANCELED':
      message = `We're sorry, your order #${orderId} has been canceled.`;
      break;
    default:
      message = `Your order #${orderId} status has been updated.`;
      break;
  }

  try {
    // Use your SMS sending function (e.g., an API call to your SMS provider)
    await sendSMS(phoneNumber, message); // Your existing SMS sending logic here
    console.log(`SMS sent successfully to ${phoneNumber}`);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};
