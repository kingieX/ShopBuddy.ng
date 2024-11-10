import axios from 'axios';

// Function to send SMS using BulkSMS Nigeria
export const sendSMS = async (phoneNumber: string, message: string) => {
  try {
    const response = await axios.post(
      'https://www.bulksmsnigeria.com/api/v2/sms',
      {
        api_token: process.env.BULKSMS_API_KEY, // Replace with your BulkSMS API Key
        to: phoneNumber,
        from: process.env.SMS_SENDER_ID,
        body: message,
      }
    );
    console.log('SMS sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS');
  }
};
