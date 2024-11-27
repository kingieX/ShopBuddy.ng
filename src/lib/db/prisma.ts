// import { PrismaClient } from '@prisma/client';

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Add the singleton client to the global object in development
declare const globalThis: {
  prismaGlobal?: PrismaClient;
} & typeof global;

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, always create a new PrismaClient instance to ensure it's not cached
  prisma = new PrismaClient();
} else {
  // In development, use a global singleton to reuse the Prisma client between requests
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = prismaClientSingleton();
  }
  prisma = globalThis.prismaGlobal;
}

export default prisma;
