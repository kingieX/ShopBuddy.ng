import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the Product interface
interface Product {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
  regularPrice: number;
  salePrice?: number;
  status: string;
  category: {
    id: string;
    name: string;
  } | null;
  createdAt: string;
}

// Define the Wishlist context type
interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

// Initialize the context with default values
const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

// Create a provider component
export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => [...prev, product]);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the WishlistContext
export const useWishlist = () => useContext(WishlistContext);
