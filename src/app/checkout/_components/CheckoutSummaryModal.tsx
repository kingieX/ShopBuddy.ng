import React from 'react';
import { AiOutlineClose, AiOutlineDollarCircle } from 'react-icons/ai';

interface OrderSummary {
  orderId: string;
  subtotal: number;
  serviceCharge: number;
  deliveryFee: number;
  vat: number;
  grandTotal: number;
}

interface CheckoutSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderSummary: OrderSummary;
  onPayNow: () => void;
}

const CheckoutSummaryModal: React.FC<CheckoutSummaryModalProps> = ({
  isOpen,
  onClose,
  orderSummary,
  onPayNow,
}) => {
  if (!isOpen) return null;

  console.log('orderSummary:', orderSummary);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-8 transition-opacity duration-300 ease-in-out">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="mb-2 flex items-center justify-center text-2xl font-bold text-gray-800">
          Order Summary
        </h2>

        <p className="mb-4 font-normal">
          <span className="font-semibold">order id: </span>
          {orderSummary.orderId}
        </p>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">{orderSummary.subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Service Charge:</span>
            <span className="font-semibold">{orderSummary.serviceCharge}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span className="font-semibold">{orderSummary.deliveryFee}</span>
          </div>

          <div className="flex justify-between">
            <span>VAT (1.5%):</span>
            <span className="font-semibold">{orderSummary.vat}</span>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total:</span>
            <span>{orderSummary.grandTotal}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-600 hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={onPayNow}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            <AiOutlineDollarCircle />
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummaryModal;
