'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession
import React from 'react';

const Hero: React.FC = () => {
  const navigate = useRouter();
  const { data: session } = useSession(); // Get session data

  const handleLogin = () => {
    navigate.push('/auth/signin');
  };

  const handleShopNow = () => {
    navigate.push('/products');
  };

  const handleSignUp = () => {
    navigate.push('/auth/signup');
  };

  return (
    <div
      className="flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(/assets/heroImage.jpeg)' }}
    >
      <div className="w-full rounded-lg bg-black bg-opacity-60 p-10 text-center lg:p-24">
        <h1 className="lg:animate- mb-0 mt-12 text-2xl font-bold text-white lg:mb-4 lg:mt-4 lg:text-5xl">
          Discover Amazing Products
        </h1>
        <p className="mb-4 text-sm text-white lg:mb-8 lg:text-lg">
          Explore our exclusive collections and elevate your everyday experience
          with products designed to inspire and delight. Shop now and transform
          the ordinary into the exceptional!
        </p>
        {!session ? ( // Check if the session exists
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogin}
              className="transform bg-button px-4 py-2 text-white transition-transform hover:scale-105 lg:px-12"
            >
              Sign In
            </button>
            <button
              onClick={handleSignUp}
              className="transform rounded-lg border-2 border-white bg-transparent px-4 py-2 text-white shadow-lg transition-transform hover:scale-105 lg:px-6 lg:py-3"
            >
              Create Account
            </button>
          </div>
        ) : (
          <button
            onClick={handleShopNow}
            className="transform rounded-lg border-2 border-white bg-transparent px-4 py-2 text-white shadow-lg transition-transform hover:scale-105 lg:px-6 lg:py-3"
          >
            Shop Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
