import { FC } from 'react';

interface Props {
  visible?: boolean;
  onRequestClose?(): void;
}

const SideCart: FC<Props> = ({ visible, onRequestClose }) => {
  return (
    <div
      style={{ right: visible ? '0' : '-100%' }}
      className="fixed right-0 top-0 z-50 flex min-h-screen w-96 flex-col bg-white shadow-md transition-all"
    >
      <div className="flex justify-between p-4">
        <h1 className="font-semibold uppercase text-gray-600">Cart</h1>
        <button className="text-sm uppercase">Clear</button>
      </div>
      <div className="h-0.5 w-full bg-gray-200" />

      <div className="p-4">
        <div className="flex space-x-4">
          <img
            src="https://images.unsplash.com/photo-1604671748253-e683240e7efa?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="aspect-square w-16 rounded object-cover"
          />
          <div className="flex-1">
            <h2 className="font-semibold">Smartphone Case</h2>
            <div className="flex space-x-1 text-sm text-gray-400">
              <span>1</span>
              <span>x</span>
              <span>100</span>
            </div>
          </div>

          <div className="ml-auto">
            <button className="text-xs uppercase hover:underline">
              Remove
            </button>

            <div className="flex items-center justify-between">
              <button>-</button>
              <span className="text-xs">1</span>
              <button>+</button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-0.5 w-full bg-gray-200" />

      <div className="mt-auto p-4">
        <div className="py-4">
          <h1 className="text-xl font-semibold uppercase">Total</h1>
          <p className="font-semibold">
            <span className="font-normal text-gray-400">
              The total of your cart is:
            </span>{' '}
            ${100}
          </p>
        </div>

        <button className="w-full rounded border-2 border-orange-600 py-2 uppercase text-orange-600">
          Checkout
        </button>
        <button
          onClick={onRequestClose}
          className="mt-4 block w-full text-center uppercase outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SideCart;
