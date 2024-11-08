// Enum types for OrderStatus and PaymentStatus
export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  INPROGRESS = 'INPROGRESS',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

// Interface for Wishlist
export interface Wishlist {
  id: string;
  userId: number;
  user?: User; // Relationship to User
  createdAt: Date;
  updatedAt: Date;
}

// Interface for WishlistProduct
export interface WishlistProduct {
  id: string;
  wishlistId: string;
  productId: string;
  wishlist?: Wishlist; // Relationship to Wishlist
  product?: Product; // Relationship to Product
}

// Interface for Product
export interface Product {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
  regularPrice: number;
  salePrice?: number;
  status: string;
  categoryId: string;
  category?: Category; // Relationship to Category
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Category
export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Cart
export interface Cart {
  id: string;
  userId: number;
  user?: User; // Relationship to User
  items?: CartItem[]; // Relationship to CartItems
  createdAt: Date;
  updatedAt: Date;
}

// Interface for CartItem
export interface CartItem {
  id: string;
  productId: string;
  cartId: string;
  quantity: number;
  product?: Product; // Relationship to Product
  createdAt: Date;
}

// Interface for Promotion
export interface Promotion {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Admin
export interface Admin {
  id: number;
  email: string;
  password: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for User
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  location?: string;
  emailVerified: boolean;
  verificationToken?: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  billingDetails?: BillingDetails[]; // Relationship to BillingDetails
  orders?: Order[]; // Relationship to Orders
  wishlist?: Wishlist; // Relationship to Wishlist
  createdAt: Date;
  updatedAt: Date;
}

// Interface for BillingDetails
export interface BillingDetails {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  userId: number;
  user?: User; // Relationship to User
  createdAt: Date;
}

// Interface for Order
export interface Order {
  id: string;
  userId: number;
  user?: User; // Relationship to User
  billingDetailsId: string;
  billingDetails?: BillingDetails; // Relationship to BillingDetails
  items?: OrderItem[]; // Relationship to OrderItems
  totalAmount: number;
  deliveryFee: number;
  vat: number;
  status: OrderStatus;
  payment?: Payment; // Relationship to Payment
  createdAt: Date;
  updatedAt: Date;
}

// Interface for OrderItem
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  order?: Order; // Relationship to Order
  product?: Product; // Relationship to Product
  quantity: number;
  price: number;
  createdAt: Date;
}

// Interface for Payment
export interface Payment {
  id: string;
  orderId: string;
  order?: Order; // Relationship to Order
  amount: number;
  transactionRef: string;
  status: PaymentStatus;
  createdAt: Date;
}
