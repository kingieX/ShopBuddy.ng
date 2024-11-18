'use client';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineDollarCircle } from 'react-icons/ai';

interface BillingDetails {
  fullname: string;
  email: string;
  phone: string;
  address: string;
}

interface OrderSummary {
  orderId: string;
  subtotal: number;
  serviceCharge: number;
  deliveryFee: number;
  vat: number;
  grandTotal: number;
  billingDetails: BillingDetails;
}

interface CheckoutSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderSummary: OrderSummary;
}

const CheckoutSummaryModal: React.FC<CheckoutSummaryModalProps> = ({
  isOpen,
  onClose,
  orderSummary,
}) => {
  const [loading, setLoading] = useState(false);
  if (!isOpen) return null;

  // console.log('orderSummary:', orderSummary);

  // CheckoutSummaryModal.tsx (snippet where you handle the payment button click)

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Ensure totalAmount is an integer (convert to kobo by multiplying by 100)
      const totalAmountInKobo = Math.round(orderSummary.grandTotal * 100);

      const response = await fetch('/api/payments/initiate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderSummary.orderId,
          totalAmount: totalAmountInKobo, // Send amount in kobo (integer)
          customerEmail: orderSummary.billingDetails.email,
        }),
      });

      if (response.ok) {
        const { authorizationUrl } = await response.json();
        // Redirect to Paystack payment page
        window.location.href = authorizationUrl;
      } else {
        alert('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <span className="font-semibold">
              <CurrencyFormatter amount={orderSummary.subtotal} />
            </span>
          </div>

          <div className="flex justify-between">
            <span>Service Charge:</span>
            <span className="font-semibold">
              <CurrencyFormatter amount={orderSummary.serviceCharge} />
            </span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span className="font-semibold">
              <CurrencyFormatter amount={orderSummary.deliveryFee} />
            </span>
          </div>

          <div className="flex justify-between">
            <span>VAT (1.5%):</span>
            <span className="font-semibold">
              <CurrencyFormatter amount={orderSummary.vat} />
            </span>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total:</span>
            <span>
              <CurrencyFormatter amount={orderSummary.grandTotal} />
            </span>
          </div>
        </div>

        <div className="mt-6 flex w-full justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-600 hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={handlePayment}
            className="flex items-center space-x-2 border-2 bg-button px-4 py-2 text-white hover:bg-blue-600"
          >
            <AiOutlineDollarCircle />
            <span>{loading ? 'Paying now...' : 'Pay Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummaryModal;
