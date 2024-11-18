'use client';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import React, { useState, useEffect } from 'react';
import { FaGift, FaTags } from 'react-icons/fa'; // Import relevant icons
import { IoIosClose } from 'react-icons/io';

const DiscountAd = () => {
  const [showAd, setShowAd] = useState(true);

  const closeAd = () => {
    setShowAd(false);
  };

  useEffect(() => {
    // Show ad after a delay, simulate an animation of floating in
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 2000);

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  if (!showAd) return null; // Don't render ad if it's not shown

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 p-4"
      aria-live="polite"
    >
      <div className="animate-float-up w-full max-w-lg scale-0 transform rounded-lg bg-blue-500 p-8 text-white shadow-lg transition-all duration-500">
        {/* Close Button */}
        <button
          onClick={closeAd}
          className="absolute right-2 top-2 font-bold text-white"
        >
          <IoIosClose className="h-6 w-6" />
        </button>

        {/* Title */}
        <h3 className="text-center text-2xl font-extrabold text-black">
          🎉 Special Offer: Limited Time Only!
        </h3>

        {/* Content */}
        <p className="pt-4 text-center text-black">
          Enjoy a whooping{' '}
          <span className="font-semibold">
            <CurrencyFormatter amount={2000} /> off
          </span>{' '}
          on all orders exceeding <span className="font-semibold">N30,000</span>
          . Use the code <strong className="text-button">SHOPBUDDY</strong> at
          checkout to claim your discount.
        </p>

        {/* Icons */}
        <div className="mt-4 flex justify-center gap-4">
          <FaGift className="h-8 w-8 text-white" />
          <FaTags className="h-8 w-8 text-white" />
        </div>

        {/* Action Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => window.open('/products', '_self')}
            className="inline-flex items-center justify-center rounded-md bg-button px-6 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountAd;
