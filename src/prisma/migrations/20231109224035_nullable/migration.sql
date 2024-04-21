-- AlterTable
ALTER TABLE `User` MODIFY `biography` VARCHAR(191) NULL,
    MODIFY `profilePhoto` VARCHAR(191) NULL,
    MODIFY `bornDate` DATETIME(3) NULL,
    MODIFY `activationKey` VARCHAR(191) NULL,
    MODIFY `deleteKey` VARCHAR(191) NULL;
