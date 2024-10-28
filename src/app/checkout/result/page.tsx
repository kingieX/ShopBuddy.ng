// app/checkout/result/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const PaymentResultPage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'failure'>(
    'loading'
  );
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyPayment = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get('reference');
      const orderId = urlParams.get('orderId');

      if (!reference || !orderId) {
        setStatus('failure');
        setMessage('Invalid payment details.');
        return;
      }

      try {
        const response = await fetch('/api/payments/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reference, orderId }),
        });

        if (response.ok) {
          const data = await response.json();
          setStatus('success');
          setMessage(data.message || 'Payment successful!');
        } else {
          setStatus('failure');
          setMessage('Payment verification failed.');
        }
      } catch (error) {
        setStatus('failure');
        setMessage('Error verifying payment. Please try again.');
      }
    };

    verifyPayment();
  }, []);

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-6 text-center shadow-md">
        {status === 'loading' && <p>Verifying payment...</p>}

        {status === 'success' && (
          <>
            <div className="animate-checkmark mb-4 flex justify-center">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                className="text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-green-600">
              Payment Successful!
            </h2>
            <p>{message}</p>
          </>
        )}

        {status === 'failure' && (
          <>
            <div className="animate-xmark mb-4">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                className="text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
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
