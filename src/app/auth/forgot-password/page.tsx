'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error);
      } else {
        const data = await res.json();
        toast.success(data.message, {
          duration: 4000, // Toast shows for 4 seconds
        });
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar isAuthPage={true} />
      <div className="flex flex-col items-center justify-center gap-6 bg-gray-50 py-24">
        <div className="max-w-lg rounded-lg bg-white p-8 text-center lg:shadow-lg">
          <h1 className="text-4xl font-semibold">Forgot Password</h1>
          <p className="mb-4 mt-4 text-gray-600">
            Enter your registered email to reset your password
          </p>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              required
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              className="mt-8 w-full bg-button text-white transition-all duration-300 hover:bg-blue-700"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Reset Link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>
          <div className="mt-2 text-center text-sm">
            Remember your password?{' '}
            <Link
              href="/auth/signin"
              className="text-sm text-blue-500 underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
          {message && <p className="mt-2 text-sm text-green-500">{message}</p>}
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
}
