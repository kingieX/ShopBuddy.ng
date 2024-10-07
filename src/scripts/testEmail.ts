import nodemailer from 'nodemailer';

// Import the sendVerificationEmail function from the module where it's defined
import { sendVerificationEmail } from '@/utils/sendVerificationEmail';

// Test function to verify email sending
async function testSendEmail() {
  try {
    // Define a test email to send the verification link
    const testEmail = 'kingsleynnachi95@gmail'; // Replace with your test email
    const verificationToken = '428428'; // You can use a mock token

    // Call the function you're testing
    await sendVerificationEmail(testEmail, verificationToken);

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

testSendEmail();
