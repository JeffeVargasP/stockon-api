/*
  Warnings:

  - You are about to alter the column `weight` on the `Card` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Card` MODIFY `thumb` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `brand` VARCHAR(191) NULL,
    MODIFY `weight` VARCHAR(191) NULL,
    MODIFY `color` VARCHAR(191) NULL,
    MODIFY `model` VARCHAR(191) NULL,
    MODIFY `validity` VARCHAR(191) NULL,
    MODIFY `amount` VARCHAR(191) NULL;
