'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Error from '../../../public/assets/error.svg';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ErrorPage: React.FC = () => {
  const router = useRouter();

  const handleReload = () => {
    // Check if there's a previous page in the history stack
    if (window.history.length > 1) {
      // If there is a history, go back
      router.back();
    } else {
      // If no history, navigate to home page
      router.push('/');
    }

    // Reload the page after navigation
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-8 py-8 text-center">
      {/* Animate the image with framer-motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center"
      >
        <Image
          src={Error}
          alt="Error"
          width={1000}
          height={1000}
          className="w-full lg:w-1/2"
        />
      </motion.div>

      {/* Animate the heading with framer-motion */}
      <motion.h1
        className="py-4 text-4xl font-bold text-red-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Connection Error
      </motion.h1>

      {/* Animate the paragraph text with framer-motion */}
      <motion.p
        className="mb-6 max-w-sm text-lg text-gray-600 lg:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        There was an issue connecting to the website. Please check your network
        and try again.
      </motion.p>

      {/* Animate the button with framer-motion */}
      <motion.button
        onClick={handleReload}
        className="rounded-lg bg-button px-6 py-3 text-white transition hover:bg-blue-600"
        whileHover={{ scale: 1.1 }} // Button hover animation
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Reload Page
      </motion.button>
    </div>
  );
};

export default ErrorPage;
