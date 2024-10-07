'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const VerifyRequest = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError('No email found. Please sign up again.');
    }
  }, []);

  const handleResendVerification = async () => {
    if (!email) {
      setError('No email found to resend verification link.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend the verification link');
      }

      setSuccessMessage('Verification link has been resent to your email.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar isSignedIn={false} isAuthPage={true} profileImage="" />
      <div className="flex flex-col items-center justify-center gap-6 px-10 py-24">
        <h1 className="text-3xl font-semibold">Verify Your Email</h1>
        <p className="text-gray-600">
          We have sent a verification link to{' '}
          <span className="font-semibold">{email}</span>. Please check your
          inbox or spam folder.
        </p>

        {error && (
          <div className="w-full max-w-md rounded-md bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="w-full max-w-md rounded-md bg-green-100 p-4 text-green-700">
            {successMessage}
          </div>
        )}

        <Button
          className="w-full max-w-md bg-button text-white transition-colors duration-300 hover:bg-blue-700"
          onClick={handleResendVerification}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 animate-spin" />
          ) : (
            'Resend Verification Link'
          )}
        </Button>

        <p className="text-sm text-gray-500">
          Didn’t receive the email? Ensure you have entered the correct email
          address, or click the button to resend the link.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default VerifyRequest;
