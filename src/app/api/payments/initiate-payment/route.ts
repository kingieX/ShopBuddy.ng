// app/api/payments/initiate-payment.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

interface InitiatePaymentRequest {
  orderId: string;
  totalAmount: number;
  customerEmail: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get request body
    const { orderId, totalAmount, customerEmail } =
      (await request.json()) as InitiatePaymentRequest;

    console.log('Total Amount: ', totalAmount);

    const amount = Math.round(totalAmount);

    const reference = `ORD_${orderId}`;

    // Prepare data for Paystack API
    const paystackData = {
      email: customerEmail,
      amount: amount * 100,
      reference: reference, // Unique order reference
      // callback_url: `${process.env.NEXT_PUBLIC_URL}/api/payments/verify-payment?orderId=${orderId}`,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/checkout/result?reference=${reference}&orderId=${orderId}`,
    };

    // Send request to Paystack to initialize payment
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      paystackData,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Secure authorization with your Paystack secret key
          'Content-Type': 'application/json',
        },
      }
    );

    // Handle Paystack's response
    const { authorization_url } = response.data.data;

    return NextResponse.json({
      message: 'Payment initialized successfully',
      authorizationUrl: authorization_url,
    });
  } catch (error) {
    console.error('Error initializing payment:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    );
  }
}
