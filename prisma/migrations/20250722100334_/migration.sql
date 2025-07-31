/*
  Warnings:

  - You are about to drop the column `decription` on the `adminassignment` table. All the data in the column will be lost.
  - Added the required column `title` to the `AdminAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adminassignment` DROP COLUMN `decription`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `StudentAssignment` ADD CONSTRAINT `StudentAssignment_adminAssignmentId_fkey` FOREIGN KEY (`adminAssignmentId`) REFERENCES `AdminAssignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
