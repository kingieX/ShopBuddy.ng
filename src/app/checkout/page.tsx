'use client';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/NavBar';
import BillingDetails from './_components/BillingDetails';
import OrderSummary from './_components/OrderSummary';
import { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { useCart } from '@/app/contexts/CartContext';
import { useRouter } from 'next/navigation';

const CheckOutPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const router = useRouter();
  // const { cart, totalPrice } = useCart();
  const [billingDetails, setBillingDetails] = useState({});

  // Update billing details from BillingDetails component
  const handleBillingDetailsChange = (details: any) => {
    setBillingDetails(details);
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billingDetails,
          deliveryFee,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('data', data);

        setSuccess('Order placed successfully!');
        // router.push(`/order-confirmation/${data.orderId}`);
      } else {
        setError('Failed to place order');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar isAuthPage={false} />
      <div className="px-8 py-20 lg:px-20">
        {/* header */}
        <header className="stick z-5 top-0 mb-8 mt-5 flex h-14 items-center gap-4 border-b bg-white px-4 py-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="hover:underline" href="/">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="hover:underline" href="/products">
                    All Products
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Checkout</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* checkout */}
        <div className="flex min-h-screen flex-col px-8 lg:flex-row lg:space-x-20">
          <div className="flex-1">
            <BillingDetails
              onDeliveryFeeChange={setDeliveryFee}
              onBillingDetailsChange={handleBillingDetailsChange}
            />
          </div>
          <div className="mt-8 flex-1 lg:mt-0">
            <OrderSummary deliveryFee={deliveryFee} />
            <button
              onClick={handlePlaceOrder}
              className="mt-4 w-full border-2 bg-button py-2 text-white hover:bg-blue-600"
            >
              {loading ? 'Placing order...' : 'Place Order'}
            </button>
          </div>

          {/* Error & Success message */}
          {error && (
            <div className="py-4 text-center text-red-500">{error}</div>
          )}
          {success && (
            <div className="py-4 text-center text-green-500">{success}</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckOutPage;
