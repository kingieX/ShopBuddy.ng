'use client';
import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon
import { IoIosClose } from 'react-icons/io';

const WhatsAppOrder = () => {
  const [showAd, setShowAd] = useState(true);

  const closeAd = () => {
    setShowAd(false);
  };

  // WhatsApp link
  const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi,%20I%20am%20interested%20in%20ordering%20a%20product%20that%20is%20not%20available%20on%20your%20website.`;

  useEffect(() => {
    // Show ad after a delay
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 3000);

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  if (!showAd) return null; // Don't render ad if it's not shown

  return (
    <div className="fixed bottom-4 right-4 z-30 w-96 rounded-lg bg-green-600 px-4 py-6 text-white shadow-lg">
      {/* Captivating Title */}
      <h3 className="mt-2 text-center text-xl font-bold">
        Can't find what you're looking for? We've Got You Covered!
      </h3>

      {/* Main Advertisement Message */}
      <p className="max-w-md pt-4 text-center text-green-100">
        No worries, we’ve got you covered! If you can’t find what you need, just
        let us know, and we’ll get it for you through WhatsApp!
      </p>

      <div className="flex items-center justify-center">
        <button
          onClick={() => window.open(whatsappLink, '_blank')}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-200"
        >
          <FaWhatsapp className="mr-2 h-5 w-5" />
          <span>Order via WhatsApp</span>
        </button>
      </div>

      {/* Close Button */}
      <button
        onClick={closeAd}
        className="absolute right-2 top-2 font-bold text-white"
      >
        <IoIosClose className="h-6 w-6" />
      </button>
    </div>
  );
};

export default WhatsAppOrder;
