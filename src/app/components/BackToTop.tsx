'use client';
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Import the Up Arrow icon

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling effect
    });
  };

  // Show the button when the user scrolls 200px down
  const checkScrollPosition = () => {
    if (window.scrollY > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', checkScrollPosition);

    // Clean up on unmount
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-5 z-50 rounded-full bg-button p-3 text-white shadow-lg transition-all hover:bg-blue-700 lg:bottom-12"
        aria-label="Back to top"
      >
        <FaArrowUp className="h-6 w-6" />
      </button>
    )
  );
};

export default BackToTop;
