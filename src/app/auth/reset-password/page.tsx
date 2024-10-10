'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast'; // Import toast
import { Eye, EyeOff } from 'lucide-react'; // Import icons for eye toggle

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = new URLSearchParams(window.location.search).get('token');

    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      if (!token) {
        setError('Token is missing');
        setLoading(false);
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/auth/reset-password`, {
        method: 'POST',
        body: JSON.stringify({ password, token }),
      });

      if (res.ok) {
        // Show success toast notification
        toast.success(
          'Password successfully reset! Redirecting to Log in page',
          {
            duration: 4000, // Toast shows for 4 seconds
          }
        );

        // Redirect to login page after 4 seconds
        setTimeout(() => {
          router.push('/auth/signin');
        }, 4000);
      } else {
        const data = await res.json();
        setError(data.error);
      }
    } catch (error) {
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
          <h1 className="text-4xl font-semibold">Reset Your Password</h1>
          <p className="mb-4 mt-4 text-gray-600">Enter a new password</p>
          <form className="flex flex-col" onSubmit={handleReset}>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Toggle password visibility */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative mt-4">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {/* Toggle password visibility for confirmPassword */}
              <button
                type="button"
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              type="submit"
              className="mt-8 w-full bg-button text-white transition-all duration-300 hover:bg-blue-700"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting Password...
                </div>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
}
