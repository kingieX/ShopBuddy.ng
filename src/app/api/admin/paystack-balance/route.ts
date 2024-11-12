import { NextRequest, NextResponse } from 'next/server';

interface PaystackBalanceResponse {
  status: boolean;
  message: string;
  data: Array<{
    currency: string;
    balance: number;
  }>;
}

// Export the GET method explicitly in the route file
export async function GET(req: NextRequest): Promise<NextResponse> {
  const paystackSecretKey: string | undefined = process.env.PAYSTACK_SECRET_KEY;

  // Check if the Paystack secret key is available
  if (!paystackSecretKey) {
    return NextResponse.json(
      { error: 'Paystack secret key is missing' },
      { status: 400 }
    );
  }

  try {
    // Make a GET request to the Paystack API endpoint to retrieve the balance
    const response: Response = await fetch('https://api.paystack.co/balance', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch balance' },
        { status: response.status }
      );
    }

    // Parse the JSON data from the response
    const data: PaystackBalanceResponse = await response.json();

    // Return the balance data as a response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching Paystack balance:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal Server Error', details: errorMessage },
      { status: 500 }
    );
  }
}
