import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/contexts/CartContext';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';

interface OrderSummaryProps {
  deliveryFee: any;
  onCouponCodeChange: (couponCode: string) => void; // Callback to send coupon code to parent
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  deliveryFee = 0,
  onCouponCodeChange,
}) => {
  const { cart, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [invalidCoupon, setInvalidCoupon] = useState(false); // State for invalid coupon

  if (!cart) return null;

  const serviceCharge = 1000;

  let vatValue;
  const rate = 2500;
  if ((totalPrice as any) > rate) {
    vatValue = 0.015 * (totalPrice + deliveryFee + serviceCharge) + 100;
  } else {
    vatValue = 0.015 * (totalPrice + deliveryFee + serviceCharge);
  }

  // Calculate initial grand total without coupon
  const initialGrandTotal = totalPrice + deliveryFee + serviceCharge + vatValue;

  // Calculate the final grand total (after coupon is applied if applicable)
  let finalGrandTotal = initialGrandTotal;
  if (couponCode === 'SHOPBUDDY' && (totalPrice as any) > 30000) {
    finalGrandTotal -= 2000; // Apply discount if conditions are met
  }

  const handleApplyCoupon = () => {
    if (couponCode === 'SHOPBUDDY' && (totalPrice as any) > 30000) {
      setDiscountApplied(true);
      setInvalidCoupon(false); // Reset invalid coupon flag
    } else {
      setDiscountApplied(false);
      setInvalidCoupon(true); // Set invalid coupon flag
    }

    // Send the coupon code to the parent component
    onCouponCodeChange(couponCode);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold lg:text-2xl">Order Summary</h2>

      {/* Cart Items */}
      <div className="space-y-2 p-4">
        {cart.map((item) => (
          <div key={item.id} className="flex space-x-2 border-b pb-2">
            <div className="p-2">
              {item.product.mainImage ? (
                <Image
                  src={item.product.mainImage}
                  alt={item.product.title}
                  width={1500}
                  height={1500}
                  className="h-16 w-16 rounded-lg object-contain"
                />
              ) : (
                <div className="h-16 w-16 rounded-lg bg-gray-200" />
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-sm font-semibold">{item.product.title}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{item.quantity}</span>
                <span>x</span>
                <span>
                  <CurrencyFormatter
                    amount={item.product.salePrice || item.product.regularPrice}
                  />
                </span>
              </div>
            </div>
            <div className="ml-auto text-right">
              <p className="text-gray-600">
                <CurrencyFormatter
                  amount={item.product.salePrice || item.product.regularPrice}
                />
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        {/* Subtotal */}
        <div className="flex justify-between border-b pb-1">
          <span className="font-normal">Subtotal:</span>
          <p>
            <CurrencyFormatter amount={totalPrice as any} />
          </p>
        </div>

        {/* Service charge */}
        <div className="my-2 flex justify-between border-b pb-1">
          <span className="font-normal">Service charge:</span>
          <p>
            <CurrencyFormatter amount={serviceCharge} />
          </p>
        </div>

        {/* Delivery fee */}
        <div className="my-2 flex justify-between border-b pb-1">
          <span className="font-normal">Delivery Fee:</span>
          <p>
            <CurrencyFormatter amount={deliveryFee} />
          </p>
        </div>

        {/* VAT */}
        <div className="my-2 flex justify-between border-b pb-1">
          <span className="font-normal">VAT 1.5% (included):</span>
          <p>
            <CurrencyFormatter amount={vatValue} />
          </p>
        </div>

        {/* Coupon */}
        <div className="flex flex-col gap-4 py-4 lg:flex-row">
          <input
            type="text"
            placeholder="Coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-1/2 border border-gray-800 px-4 py-2 outline-button"
          />

          <button
            onClick={handleApplyCoupon}
            className="border-2 bg-button px-4 py-2 text-white hover:bg-blue-600"
          >
            Apply coupon
          </button>
        </div>

        {/* Discount Applied Message */}
        {discountApplied && (
          <div className="mt-2 text-green-500">
            Coupon applied! Discount: -2000
          </div>
        )}

        {/* Invalid Coupon Message */}
        {invalidCoupon && (
          <div className="mt-2 text-red-500">
            The coupon code is invalid or does not meet the requirements.
          </div>
        )}

        {/* Grand Total */}
        <div className="mt-4 flex justify-between">
          <span className="font-semibold">Grand Total:</span>
          <p className="font-semibold">
            <CurrencyFormatter
              amount={discountApplied ? finalGrandTotal : initialGrandTotal}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
