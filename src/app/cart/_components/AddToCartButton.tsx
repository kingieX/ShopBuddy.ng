import { useCart } from '@/app/contexts/CartContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
  productId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
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
      className="absolute bottom-0 left-0 w-full rounded-b-md bg-black py-2 text-white transition-opacity hover:bg-black/80 lg:opacity-0 lg:group-hover:opacity-100"
      onClick={handleAddToCart} // Trigger cart addition when clicked
      disabled={isAdding} // Disable the button while the product is being added to cart
    >
      {isAdding ? 'Adding...' : 'Add to cart'}
    </button>
  );
};

export default AddToCartButton;
