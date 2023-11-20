-- AlterTable
ALTER TABLE `User` ADD COLUMN `stayLogged` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `stayLoggedKey` VARCHAR(191) NULL;
