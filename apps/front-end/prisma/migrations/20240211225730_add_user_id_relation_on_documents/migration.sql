/*
  Warnings:

  - The primary key for the `Documents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `userId` to the `Documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Documents` DROP PRIMARY KEY,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`name`);

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
