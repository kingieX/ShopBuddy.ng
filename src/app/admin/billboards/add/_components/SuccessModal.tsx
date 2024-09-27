import React, { useEffect, useState } from 'react';

interface SuccessModalProps {
  onClose: () => void;
  onAddAnotherProduct: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  onClose,
  onAddAnotherProduct,
}) => {
  const [isVisible, setIsVisible] = useState(false); // Modal visibility state with animation

  useEffect(() => {
    // Start animation when the component is mounted
    setIsVisible(true);
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
          Promotion Created Successfully!
        </h2>
        <p className="mb-6 text-center text-sm lg:text-lg">
          Would you like to add another promotion or return to the dashboard?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onAddAnotherProduct}
            className="rounded bg-button px-4 py-2 text-white transition hover:bg-blue-600"
          >
            Add Another Product
          </button>
          <button
            onClick={onClose}
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
