'use client';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';

const VerificationSuccess = () => {
  const router = useRouter();

  return (
    <>
      <Navbar isSignedIn={false} isAuthPage={true} profileImage="" />
      <div className="flex flex-col items-center justify-center gap-6 bg-gray-50 py-24">
        <div className="max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
          <h1 className="text-4xl font-semibold text-green-600">
            Account Verified!
          </h1>
          <p className="mt-4 text-gray-600">
            Congratulations, your account has been successfully verified.
          </p>
          <p className="mt-2 text-gray-500">
            You can now log in and start using your account.
          </p>

          <Button
            onClick={() => router.push('/auth/signin')}
            className="mt-8 w-full bg-button text-white transition-all duration-300 hover:bg-blue-700"
          >
            Go to Login
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerificationSuccess;
