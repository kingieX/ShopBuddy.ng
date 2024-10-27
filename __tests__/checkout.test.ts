import { createOrder } from '../src/app/api/checkout/route';
import prisma from '@/lib/db/prisma';

describe('Cart Retrieval and Totals Calculation', () => {
  it('should calculate total price and VAT correctly', async () => {
    // Mock the user session
    const userId = 1; // Use a valid user ID from your test data
    const mockCart = {
      items: [
        { product: { salePrice: 100 }, quantity: 2 },
        { product: { salePrice: 200 }, quantity: 1 },
      ],
    };

    // Mock the prisma.findUnique to return your mockCart
    jest.spyOn(prisma.cart, 'findUnique').mockResolvedValue(mockCart);

    // Call the function that handles order creation
    const response = await createOrder({ userId });

    // Calculate expected total and VAT
    const expectedTotalPrice = 100 * 2 + 200 * 1; // 400
    const expectedVat =
      expectedTotalPrice >= 2500
        ? 0.015 * (expectedTotalPrice + 100)
        : 0.015 * expectedTotalPrice;
    const expectedGrandTotal = expectedTotalPrice + expectedVat;

    expect(response.totalAmount).toEqual(expectedGrandTotal);
    expect(response.vat).toEqual(expectedVat);
  });
});
