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

type CartContextType = {
  cart: Cart | null;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateCartItemQuantity: (
    cartItemId: string,
    quantity: number
  ) => Promise<void>;
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

  // Fetch the cart when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const response = await axios.post('/api/cart', { productId, quantity });
      setCart(response.data); // Update cart in context
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const response = await axios.delete(`/api/cart/${cartItemId}`);
      setCart(response.data); // Update cart after item removal
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItemQuantity = async (
    cartItemId: string,
    quantity: number
  ) => {
    try {
      const response = await axios.patch(`/api/cart/${cartItemId}`, {
        quantity,
      });
      setCart(response.data); // Update cart with new quantity
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
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
