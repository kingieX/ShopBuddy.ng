import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface SuccessModalProps {
  onClose: () => void; // Add an onClose function to handle closing the modal
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  onClose, // Handle modal closing
}) => {
  const [isVisible, setIsVisible] = useState(false); // Modal visibility state with animation

  useEffect(() => {
    setIsVisible(true); // Start animation when the component is mounted
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
      {/* Add animation class based on visibility */}
      <div
        className={`transform transition-all duration-500 ease-out ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        } mx-4 flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-white p-8 shadow-lg`}
      >
        <h2 className="mb-4 animate-pulse text-center text-lg font-semibold lg:text-2xl">
          Category Edited Successfully!
        </h2>
        <p className="mb-6 text-center text-sm lg:text-lg">
          Would you like to add another category or return to the dashboard?
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/admin/categories"
            className="rounded bg-button px-4 py-2 text-white transition hover:bg-blue-600"
          >
            View Promotion
          </Link>
          <button
            onClick={onClose} // Use the onClose function to close the modal
            className="rounded border border-gray-500 px-4 py-2 transition hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
