import AddToCartButton from '@/app/cart/_components/AddToCartButton';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

interface ProductActionProps {
  productId: string;
}

const ProductActionComponent: React.FC<ProductActionProps> = ({
  productId,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="w-full p-4">
      {/* Quantity control and Buy Now */}
      <div className="flex w-full flex-col items-center gap-4 lg:flex-row">
        <div className="flex items-center rounded-md border">
          <button
            className="border-r px-2 py-1 text-lg"
            onClick={handleDecrement}
            disabled={quantity === 0} // Disable decrement when quantity is 1
          >
            -
          </button>
          <span className="px-4 py-1 text-lg">{quantity}</span>
          <button
            className={`border-l px-2 py-1 text-lg ${
              quantity > 0 ? 'bg-button text-white' : ''
            }`}
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
        <div className="flex w-full gap-4">
          {/* <button className="w-full bg-button px-4 py-2 text-white transition hover:bg-blue-600">
            Add to cart
          </button> */}
          {/* Add to cart button */}
          <AddToCartButton productId={productId} />

          {/* <button onClick={toggleFavorite} className="text-2xl">
            <FaHeart
              className={isFavorited ? 'text-red-500' : 'text-gray-300'}
            />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductActionComponent;
