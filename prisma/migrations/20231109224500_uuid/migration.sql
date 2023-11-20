/*
  Warnings:

  - Made the column `activationKey` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleteKey` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `activationKey` VARCHAR(191) NOT NULL,
    MODIFY `deleteKey` VARCHAR(191) NOT NULL;
