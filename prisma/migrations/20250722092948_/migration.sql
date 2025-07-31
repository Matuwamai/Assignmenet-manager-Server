/*
  Warnings:

  - Added the required column `decription` to the `AdminAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adminassignment` ADD COLUMN `decription` VARCHAR(191) NOT NULL;
