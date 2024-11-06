// Define specific order statuses as a union type
export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'INPROGRESS'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELED';

// Define specific payment statuses as a union type
export type PaymentStatus = 'PENDING' | 'SUCCESSFUL' | 'FAILED';

// Define a type for products in an order
export interface Product {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  regularPrice: number;
  salePrice?: number;
  status: string;
}

// Define a type for billing details associated with an order
export interface BillingDetails {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  userId: number;
}

// Define a type for each order item
export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

// Define a type for the main order details
export interface Order {
  id: string;
  userId: number;
  billingDetailsId: string;
  billingDetails: BillingDetails;
  totalAmount: number;
  deliveryFee: number;
  vat: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

// Define a type for payment details linked to an order
export interface Payment {
  id: string;
  orderId: string;
  transactionRef: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  order: Order;
}
