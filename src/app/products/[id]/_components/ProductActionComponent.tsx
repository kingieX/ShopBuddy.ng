import { useEffect, useState } from 'react';
import { useCart } from '@/app/contexts/CartContext';
import toast from 'react-hot-toast';

interface ProductActionWithQuantitySelectorProps {
  productId: string;
}

type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: {
    title: string;
    price: number;
  };
};

const ProductActionWithQuantitySelector: React.FC<
  ProductActionWithQuantitySelectorProps
> = ({ productId }) => {
  const { cart, loading, addToCart, updateCartItemQuantity, removeFromCart } =
    useCart();
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  // Check if the product is already in the cart after fetching
  useEffect(() => {
    console.log('cart:', cart);
    if (!loading && cart) {
      const foundCartItem = cart.find((item) => item.productId === productId);
      setCartItem(foundCartItem || null); // Set the state
      setQuantity(foundCartItem ? foundCartItem.quantity : 0); // Set the quantity
      console.log('Foundcartitem:', foundCartItem); // Log the found item
    }
  }, [cart, loading, productId]);

  // Handle quantity change
  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity > 0) {
      try {
        if (cartItem) {
          await updateCartItemQuantity(cartItem.id, newQuantity);
          setQuantity(newQuantity); // Update local state only if successful
          toast.success('Product quantity updated');
        } else {
          await addToCart(productId, newQuantity);
          setQuantity(newQuantity); // Update local state only if successful
          toast.success('Product added to cart');
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        // Optionally, revert quantity back to the original state
        if (cartItem) {
          setQuantity(cartItem.quantity); // Reset to original quantity
        }
      }
    } else if (cartItem) {
      try {
        await removeFromCart(cartItem.id);
        setQuantity(0); // Reset quantity since the item is removed
        toast.error('Product removed from cart');
      } catch (error) {
        console.error('Error removing product:', error);
        // Optionally, revert quantity back to the original state
        setQuantity(cartItem.quantity);
      }
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    handleQuantityChange(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      handleQuantityChange(newQuantity);
    }
  };

  const buttonColor = quantity > 0 ? 'bg-button' : 'bg-white';

  return (
    <div className="w-full p-4">
      <div className="relative flex w-full flex-col items-center gap-4 lg:flex-row">
        <div className="flex items-center rounded-md border">
          <button
            className={`border-r px-2 py-1 text-lg ${buttonColor}`}
            onClick={handleDecrement}
            disabled={quantity <= 0}
          >
            -
          </button>
          <span className="px-4 py-1 text-lg">{quantity}</span>
          <button
            className={`border-l px-2 py-1 text-lg ${buttonColor}`}
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductActionWithQuantitySelector;
