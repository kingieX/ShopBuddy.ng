/*
  Warnings:

  - Added the required column `userId` to the `BillingDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillingDetails" ADD COLUMN     "userId" INTEGER NOT NULL;
