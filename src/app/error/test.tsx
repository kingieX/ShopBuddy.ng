'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Error from '../../../public/assets/error.svg';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ErrorPage: React.FC = () => {
  const router = useRouter();
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null); // Store the previous page

  // Utility function to retry API calls
  const retryApiCall = async (url: string, retries = 3, delay = 2000) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('API request failed');

      return await res.json(); // Assuming the response is JSON
    } catch (error) {
      if (retries === 0) {
        throw error; // No more retries left, rethrow the error
      }
      console.log(`Retrying... Attempts left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, delay)); // Delay between retries
      return retryApiCall(url, retries - 1, delay); // Retry the API request
    }
  };

  useEffect(() => {
    // Store the previous page the user was on before the error occurred
    const previousPageUrl = document.referrer || '/'; // Default to '/' if no referrer is available
    setPreviousPage(previousPageUrl);

    // Check database connection on component mount
    const checkDatabaseConnection = async () => {
      try {
        const data = await retryApiCall('/api/check-db', 3, 2000); // Retry up to 3 times with 2-second delay

        if (data.connected) {
          setDbConnected(true);
        } else {
          setDbConnected(false);
          setErrorMessage(
            'Unable to connect to the database. Please try again later.'
          );
        }
      } catch (error) {
        setDbConnected(false);
        setErrorMessage(
          'An error occurred while checking the database connection.'
        );
      }
    };

    checkDatabaseConnection();
  }, []);

  const handleReload = () => {
    // If the database is connected successfully, navigate back to the previous page
    if (dbConnected) {
      if (previousPage) {
        router.push(previousPage); // Navigate back to the previous page
      } else {
        router.push('/'); // Default to home if no previous page
      }
    }

    // Reload the page after navigation (if the retry fails or we need a reload)
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
        {dbConnected === false ? 'Connection Error' : 'Unexpected Error'}
      </motion.h1>

      {/* Animate the paragraph text with framer-motion */}
      <motion.p
        className="mb-6 max-w-sm text-lg text-gray-600 lg:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {dbConnected === null
          ? 'Checking connection...'
          : dbConnected === false
            ? 'There was an issue connecting to the website. Please check your network and try again.'
            : 'The database is connected successfully!'}
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
