import { sendSMS } from './sendSMS';

export const sendSMSVerificationCode = async (
  phoneNumber: string,
  verificationCode: string
) => {
  // Generate a message to send via SMS
  const message = `Your ShopBuddy verification code is ${verificationCode}. Please use this to complete your registration. Code expires in 10 minutes.`;

  try {
    // Send SMS using the sendSMS function
    await sendSMS(phoneNumber, message);
    console.log(`SMS sent successfully to ${phoneNumber}`);
  } catch (error) {
    console.error('Failed to send SMS verification code:', error);
    throw new Error('Failed to send SMS verification code');
  }
};
