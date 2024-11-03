import { FC } from 'react';
import { useCart } from '../contexts/CartContext';
import CurrencyFormatter from '../constants/CurrencyFormatter';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  visible?: boolean;
  onRequestClose?(): void;
}

const SideCart: FC<Props> = ({ visible, onRequestClose }) => {
  const { cart, totalPrice, updateCartItemQuantity, removeFromCart } =
    useCart();

  if (!cart) return null;

  return (
    <div
      style={{ right: visible ? '0' : '-100%' }}
      className="fixed right-0 top-0 z-50 flex h-screen max-h-screen w-96 flex-col overflow-y-auto bg-white shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex justify-between px-4 py-2">
        <h1 className="text-xl font-semibold uppercase">Cart</h1>
        <button className="text-sm uppercase" onClick={onRequestClose}>
          Close
        </button>
      </div>
      <div className="h-0.5 w-full bg-gray-200" />

      {cart.length === 0 && (
        <p className="py-12 text-center text-sm italic">
          Your cart is empty...
        </p>
      )}
      {/* Cart Items */}
      <div className="space-y-2 p-4">
        {cart.map((item) => (
          <div key={item.id} className="flex space-x-2 border-b pb-2">
            <div className="p-2">
              <Image
                src={item.product.mainImage}
                alt={item.product.title}
                width={1500}
                height={1500}
                className="h-16 w-16 rounded-lg object-contain"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-sm font-semibold">{item.product.title}</h2>
              <p className="text-gray-600">
                <CurrencyFormatter
                  amount={item.product.salePrice || item.product.regularPrice}
                />
              </p>
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
              <button
                className="text-xs uppercase text-red-500 hover:underline"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
              <div className="mt-2 flex items-center">
                <button
                  className="border px-2"
                  onClick={() =>
                    updateCartItemQuantity(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  className="border px-2"
                  onClick={() =>
                    updateCartItemQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total and Checkout Footer */}
      <div className="p-4">
        <div className="py-4">
          <h1 className="mb-2 text-lg font-semibold uppercase">Cart Total</h1>
          {/* subtotal */}
          <div className="flex justify-between border-b pb-1">
            <span className="font-normal">Subtotal:</span>
            <p className="font-semibold">
              <CurrencyFormatter amount={totalPrice as any} />
            </p>
          </div>
          {/* Delivery */}
          {/* <div className="flex justify-between border-b py-1">
            <span className="font-normal">Shipping:</span>
            <p className="font-semibold">
              <CurrencyFormatter amount={totalPrice as any} />
            </p>
          </div> */}
          {/* Service charge */}
          {/* <div className="flex justify-between border-b py-1">
            <span className="font-normal">Service charge:</span>
            <p className="font-semibold">
              <CurrencyFormatter amount={totalPrice as any} />
            </p>
          </div> */}
          {/* Total */}
          {/* <div className="flex justify-between py-2">
            <span className="font-semibold">Total:</span>
            <p className="font-semibold">
              <CurrencyFormatter amount={totalPrice as any} />
            </p>
          </div> */}
        </div>

        <Link href="/checkout">
          <button className="w-full border-2 bg-button py-2 uppercase text-white hover:bg-blue-600">
            Checkout
          </button>
        </Link>
        <button
          onClick={onRequestClose}
          className="my-2 block w-full border border-red-600 py-2 text-center uppercase text-red-600 hover:bg-red-100"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SideCart;
