import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface SuccessModalProps {
  onClose: () => void;
  onAddAnotherProduct: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose, onAddAnotherProduct }) => {
  const [isVisible, setIsVisible] = useState(false);  // Modal visibility state with animation

  useEffect(() => {
    // Start animation when the component is mounted
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      {/* Add animation class based on visibility */}
      <div
        className={`transform transition-all duration-500 ease-out ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        } flex flex-col justify-center items-center bg-white rounded-lg p-8 shadow-lg max-w-md w-full mx-4`}
      >
        <h2 className="lg:text-2xl text-lg text-center font-semibold mb-4 animate-pulse">Product Updated Successfully!</h2>
        <p className="lg:text-lg text-sm mb-6 text-center">Changes made to the product will be updated now!!!</p>
        <div className="flex justify-center gap-4">
          <Link href='/admin/products'
            // onClick={onAddAnotherProduct}
            className="bg-button text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            View Product
          </Link>
          <button
            onClick={onClose}
            className="border border-gray-500 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
