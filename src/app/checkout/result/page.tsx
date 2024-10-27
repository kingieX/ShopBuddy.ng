// app/checkout/result/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const PaymentResultPage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'failure'>(
    'loading'
  );
  const [message, setMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams?.get('reference');
      const orderId = searchParams?.get('orderId');

      if (!reference || !orderId) {
        setStatus('failure');
        setMessage('Invalid payment details.');
        return;
      }

      try {
        const response = await fetch(
          `/api/payments/verify-payment?reference=${reference}&orderId=${orderId}`
        );

        if (response.ok) {
          const data = await response.json();
          setStatus('success');
          setMessage(data.message || 'Payment successful!');
        } else {
          setStatus('failure');
          setMessage('Payment verification failed.');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setStatus('failure');
        setMessage('Error verifying payment. Please try again.');
      }
    };

    verifyPayment();
  }, [searchParams]);

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-6 text-center shadow-md">
        {status === 'loading' && <p>Verifying payment...</p>}
        {status === 'success' && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-green-600">
              Payment Successful!
            </h2>
            <p>{message}</p>
          </>
        )}
        {status === 'failure' && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-red-600">
              Payment Failed
            </h2>
            <p>{message}</p>
          </>
        )}
        <button
          onClick={handleBackToHome}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentResultPage;
