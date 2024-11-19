// import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    // Disable foreign key checks temporarily to avoid errors during deletion
    await prisma.$executeRaw`SET session_replication_role = 'replica'`;

    // Delete data from each model (table)
    await prisma.wishlist.deleteMany({});
    await prisma.wishlistProduct.deleteMany({});
    // await prisma.product.deleteMany({});
    // await prisma.category.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.cartItem.deleteMany({});
    // await prisma.promotion.deleteMany({});
    // await prisma.admin.deleteMany({});
    // await prisma.user.deleteMany({});
    await prisma.billingDetails.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.payment.deleteMany({});

    console.log('All data deleted successfully');
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
    // Re-enable foreign key checks
    await prisma.$executeRaw`SET session_replication_role = 'origin'`;

    // Disconnect Prisma Client to release resources
    await prisma.$disconnect();
  }
}

deleteAllData();
