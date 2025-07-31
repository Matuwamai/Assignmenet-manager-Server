/*
  Warnings:

  - Added the required column `assignmentName` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assignment` ADD COLUMN `assignmentName` VARCHAR(191) NOT NULL;
