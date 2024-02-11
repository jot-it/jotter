/*
  Warnings:

  - The primary key for the `Documents` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Documents` DROP PRIMARY KEY,
    MODIFY `name` CHAR(21) NOT NULL,
    ADD PRIMARY KEY (`name`);
