/*
  Warnings:

  - You are about to drop the column `isActive` on the `Promotion` table. All the data in the column will be lost.
  - Added the required column `status` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "isActive",
ADD COLUMN     "status" TEXT NOT NULL;
