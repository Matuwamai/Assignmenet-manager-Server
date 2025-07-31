/*
  Warnings:

  - You are about to drop the column `marks` on the `report` table. All the data in the column will be lost.
  - Added the required column `details` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` DROP COLUMN `marks`,
    ADD COLUMN `details` VARCHAR(191) NOT NULL;
