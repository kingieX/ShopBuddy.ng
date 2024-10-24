import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Define types for Cart and CartItem
type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: {
    title: string;
    price: number;
  };
};

type Cart = {
  id: string;
  userId: number;
  items: CartItem[];
};

// type Cart = CartItem[];

type CartContextType = {
  cart: Cart | null;
  loading: boolean; // Add loading here
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateCartItemQuantity: (
    cartItemId: string,
    quantity: number
  ) => Promise<void>;
  reduceCartItemQuantity: (cartItemId: string) => Promise<void>;
  fetchCart: () => Promise<void>;
};

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the cart when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await axios.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const existingCartItem = cart?.items?.find(
        (item) => item.productId === productId
      );
      if (existingCartItem) {
        const cartItemId = existingCartItem.id;
        await axios.patch(`/api/cart/${cartItemId}`, {
          quantity: existingCartItem.quantity + quantity,
        });
      } else {
        await axios.post('/api/cart', { productId, quantity });
      }
      fetchCart(); // Refresh the cart
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      await axios.delete(`/api/cart/${cartItemId}`);
      fetchCart(); // Refresh the cart
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItemQuantity = async (
    cartItemId: string,
    quantity: number
  ) => {
    try {
      console.log('Updating cart item with:', { cartItemId, quantity }); // Add this log
      if (quantity <= 0 || isNaN(quantity)) {
        throw new Error('Invalid quantity'); // Basic validation in frontend
      }
      await axios.patch(`/api/cart/${cartItemId}`, { quantity });
      fetchCart(); // Refresh the cart
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const reduceCartItemQuantity = async (cartItemId: string) => {
    const item = cart?.items.find((item) => item.id === cartItemId);
    if (item && item.quantity > 1) {
      await updateCartItemQuantity(cartItemId, item.quantity - 1);
    } else {
      await removeFromCart(cartItemId);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading, // Expose loading
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        reduceCartItemQuantity,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};
