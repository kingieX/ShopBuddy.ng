import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Define types for Cart and CartItem
type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    mainImage: string;
    regularPrice: number;
    salePrice: number;
  };
};

type Cart = {
  find: any;
  map(
    arg0: (item: any) => import('react').JSX.Element
  ): import('react').ReactNode;
  length: number;
  reduce(arg0: (total: any, item: any) => any, arg1: number): unknown;
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
  countAllItems: () => number;
  totalPrice: () => number;
};

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[] | null>([]]);
  const [loading, setLoading] = useState(true);

  // Fetch the cart when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await axios.get('/api/cart');
      // console.log('Cart data:', response.data); // Add this log
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

  const countAllItems = () => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  // console.log('total items in context:', countAllItems());

  const totalPrice = cart
    ? cart.reduce(
        (sum, item) =>
          sum +
          (item.product.salePrice || item.product.regularPrice) * item.quantity,
        0
      )
    : 0;

  // console.log('total price in context:', totalPrice);

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
        countAllItems: countAllItems as () => number, // Specify the return type as number
        totalPrice: totalPrice as () => number,
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
