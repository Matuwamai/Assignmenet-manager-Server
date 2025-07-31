/*
  Warnings:

  - Added the required column `marks` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` ADD COLUMN `marks` INTEGER NOT NULL;
