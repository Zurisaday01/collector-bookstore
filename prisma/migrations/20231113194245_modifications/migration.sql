/*
  Warnings:

  - You are about to drop the column `authorId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.
  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Book_authorId_idx` ON `Book`;

-- AlterTable
ALTER TABLE `Book` DROP COLUMN `authorId`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `updatedAt`,
    ADD COLUMN `paidAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `clerkId` VARCHAR(191) NOT NULL;
