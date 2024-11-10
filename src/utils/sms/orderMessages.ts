// Order message templates for user and owner

// Message to send to the user
export const getUserOrderMessage = (
  orderId: string,
  orderDetails: {
    items: Array<{ name: string; quantity: number; price: number }>;
    totalAmount: number;
    paymentStatus: string;
  }
) => {
  const itemsList = orderDetails.items
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(', ');

  return `
      Thank you for your purchase! Your order #${orderId} has been confirmed and is being processed.
      Items: ${itemsList}
      Total: #${orderDetails.totalAmount.toFixed(2)}
      Payment Status: ${orderDetails.paymentStatus}
      We're excited to have you!`;
};

// Message to send to the owner
export const getOwnerOrderMessage = (
  orderId: string,
  orderDetails: {
    totalAmount: number;
    paymentStatus: string;
    customerEmail: string;
  }
) => {
  return `
      New Order #${orderId} received. Payment: #${orderDetails.totalAmount.toFixed(2)}.
      Payment Status: ${orderDetails.paymentStatus}.
      Customer: ${orderDetails.customerEmail}`;
};
