/* eslint-disable */
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button'; // For potential retry or actions

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams?.get('token');

    if (!token) {
      setError('Verification token is missing.');
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        // Call the verify API using POST
        await axios.post('/api/auth/verify', { token });
        // If successful, navigate to the success page
        router.push('/auth/verification-success');
      } catch (error) {
        setError('Verification failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-md">
        {loading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="mt-4 text-lg text-gray-700">
              Verifying your email, please wait...
            </p>
          </div>
        ) : error ? (
          <div className="flex min-h-screen items-center justify-center text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            {/* <h2 className="text-xl font-semibold text-red-500">
              Verification Error
            </h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <Button
              className="mt-6 bg-red-500 text-white transition-all hover:bg-red-600"
              onClick={() => window.location.reload()}
            >
              Retry Verification
            </Button> */}
          </div>
        ) : (
          <p className="text-lg text-gray-700">Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
