import AddToCartButton from '@/app/cart/_components/AddToCartButton';
import QuantitySelector from '@/app/cart/_components/QuantitySelector';
import { useEffect, useState } from 'react';
import { useCart } from '@/app/contexts/CartContext';

// Define the types for the component props
interface ProductActionProps {
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

const ProductActionComponent: React.FC<ProductActionProps> = ({
  productId,
}) => {
  const { cart, addToCart } = useCart(); // Access cart and addToCart from context
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  // Check if the product is already in the cart
  useEffect(() => {
    if (cart && cart.items) {
      const foundCartItem = cart.items.find(
        (item) => item.productId === productId
      );
      setCartItem(foundCartItem || null);
    } else {
      setCartItem(null); // Ensure that cartItem is null when cart is undefined
    }
  }, [cart, productId]); // This effect runs whenever cart or product.id changes

  return (
    <div className="w-full p-4">
      {/* Quantity control and Buy Now */}
      <div className="flex w-full flex-col items-center gap-4 lg:flex-row">
        {/* Conditionally render QuantitySelector if product is in the cart */}
        {cartItem ? (
          <QuantitySelector
            cartItemId={cartItem.id}
            initialQuantity={cartItem.quantity}
            minQuantity={1}
          />
        ) : null}

        {/* Always render AddToCartButton */}
        <div className="flex w-full gap-4">
          <AddToCartButton productId={productId} />
        </div>
      </div>
    </div>
  );
};

export default ProductActionComponent;
