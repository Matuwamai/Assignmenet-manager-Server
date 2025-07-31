/*
  Warnings:

  - Added the required column `fileId` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assignment` ADD COLUMN `fileId` VARCHAR(191) NOT NULL;
