'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Footer from '@/app/components/Footer';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // Icons for eye and loader
import Navbar from '@/app/components/NavBar';

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your password link and a link to sign up if you do not have an account. The second column has a cover image.";

const SignIn = () => {
  // State management for show/hide password and loading state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission (login button)
  const handleLogin = () => {
    setLoading(true);
    // Simulate a delay for loading effect
    setTimeout(() => {
      setLoading(false);
      // Add actual login logic here
    }, 2000);
  };

  return (
    <>
      <div>
        <Navbar isSignedIn={false} isAuthPage={true} profileImage="" />
      </div>
      <div className="w-full lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-[800px]">
        {/* Image Section */}
        <div className="bg-muted hidden lg:block">
          <Image
            src="/assets/signin.png"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>

        {/* Sign-In Form Section */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="mx-auto grid w-[350px] gap-6">
            {/* Title & Subtitle */}
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-muted-foreground text-balance">
                Enter your email below to login to your account
              </p>
            </div>

            {/* Email Input */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            {/* Password Input with Show/Hide Icon */}
            <div className="grid gap-2">
              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                />
                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-[35px] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-xs underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Login Button with Spinner */}
            <Button
              type="submit"
              className="w-full bg-button text-white hover:bg-blue-500"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </Button>

            {/* Divider */}
            <div className="flex items-center justify-center">
              <div className="h-px w-full bg-gray-300"></div>
              <div className="text-muted-foreground mx-4">Or</div>
              <div className="h-px w-full bg-gray-300"></div>
            </div>

            {/* Google Login Button with Logo */}
            <Button
              variant="outline"
              className="flex w-full items-center justify-center hover:bg-gray-100"
            >
              <Image
                src="/assets/google-icon.svg" // Add the path to your Google logo
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Login with Google
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default SignIn;
