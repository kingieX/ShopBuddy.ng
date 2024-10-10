import { NextResponse, NextRequest } from 'next/server';
import {
  sendContactFormEmail,
  sendUserConfirmationEmail,
} from '../../../utils/emailService';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    // Send email to the official email
    await sendContactFormEmail(name, email, phone, message);

    // Send confirmation email to the user
    await sendUserConfirmationEmail(email);

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to send email', error },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'POST method allowed' }, { status: 200 });
}
