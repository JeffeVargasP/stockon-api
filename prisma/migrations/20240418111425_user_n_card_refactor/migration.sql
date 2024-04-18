/*
  Warnings:

  - You are about to drop the column `model` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `activationKey` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deleteKey` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stayLogged` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stayLoggedKey` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Card` DROP COLUMN `model`,
    ADD COLUMN `purchaseDate` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `activationKey`,
    DROP COLUMN `active`,
    DROP COLUMN `deleteKey`,
    DROP COLUMN `stayLogged`,
    DROP COLUMN `stayLoggedKey`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
