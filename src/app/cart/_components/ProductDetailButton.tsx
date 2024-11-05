import { useCart } from '@/app/contexts/CartContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
  productId: string;
  disabled?: boolean; // Optional prop to disable the button initially (default: false)
}

const ProductDetailButton: React.FC<AddToCartButtonProps> = ({
  productId,
  disabled,
}) => {
  const { addToCart } = useCart(); // Get the addToCart function from context
  const [isAdding, setIsAdding] = useState(false); // State to manage button loading

  const handleAddToCart = async () => {
    setIsAdding(true); // Indicate loading state when the button is clicked
    try {
      await addToCart(productId, 1); // Add product with default quantity of 1

      toast.success('Product added to cart'); // Show success message
    } catch (error) {
      toast.error('Error adding to cart');
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false); // Reset loading state
    }
  };

  return (
    <button
      className={`w-full rounded-b-md bg-black py-2 text-white transition-opacity ${disabled ? 'cursor-not-allowed bg-[#7c7979]' : 'hover:bg-black/80'}`}
      onClick={handleAddToCart} // Trigger cart addition when clicked
      disabled={isAdding || disabled} // Disable the button while the product is being added to cart
    >
      {isAdding ? 'Adding...' : 'Add to cart'}
    </button>
  );
};

export default ProductDetailButton;
