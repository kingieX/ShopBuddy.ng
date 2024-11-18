'use client';

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/NavBar';

const PaymentResultPage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'failure'>(
    'loading'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  // Ensure the user is authenticated
  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/auth/signin');
      }
    };

    securePage();
  }, [router]);

  // Verify payment status on page load
  useEffect(() => {
    const verifyPayment = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get('reference');
      const orderId = urlParams.get('orderId');

      if (!reference || !orderId) {
        setStatus('failure');
        setMessage(
          'Invalid payment details. Please check the payment information and try again.'
        );
        return;
      }

      try {
        setIsLoading(true);
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
          setMessage(
            data.message || 'Your payment was processed successfully!'
          );
        } else {
          setStatus('failure');
          setMessage(
            'Payment verification failed. Please check your payment details or try again later.'
          );
        }
      } catch (error) {
        setStatus('failure');
        setMessage('Error verifying payment. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, []);

  const handleViewOrders = () => {
    router.push('/orders');
  };

  return (
    <>
      <Navbar isAuthPage={false} />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 py-8 lg:py-4">
        <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
          {/* Loading State */}
          {status === 'loading' && (
            <div className="flex flex-col items-center justify-center">
              <svg
                className="h-16 w-16 animate-spin text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
              <p className="mt-4 text-lg text-gray-700">
                Verifying your payment, please wait...
              </p>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <>
              <div className="mb-4 flex justify-center">
                <svg
                  className="h-16 w-16 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="text-center text-2xl font-semibold text-green-600">
                Payment Successful
              </h2>
              <p className="mt-4 text-center text-lg text-gray-600">
                {message}
              </p>
            </>
          )}

          {/* Failure State */}
          {status === 'failure' && (
            <>
              <div className="mb-4 flex justify-center">
                <svg
                  className="h-16 w-16 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-center text-2xl font-semibold text-red-600">
                Payment Failed
              </h2>
              <p className="mt-4 text-center text-lg text-gray-600">
                {message}
              </p>
            </>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={handleViewOrders}
              disabled={isLoading}
              className="rounded-lg bg-button px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 disabled:bg-gray-300 disabled:text-gray-500"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentResultPage;
