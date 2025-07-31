/*
  Warnings:

  - You are about to drop the column `assignmentId` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `report` table. All the data in the column will be lost.
  - You are about to drop the `assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentassignmentId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentassignmentId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `assignment` DROP FOREIGN KEY `Assignment_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_assignmentId_fkey`;

-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_userId_fkey`;

-- DropIndex
DROP INDEX `Report_assignmentId_key` ON `report`;

-- DropIndex
DROP INDEX `Report_studentId_fkey` ON `report`;

-- AlterTable
ALTER TABLE `report` DROP COLUMN `assignmentId`,
    DROP COLUMN `studentId`,
    ADD COLUMN `studentassignmentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `assignment`;

-- DropTable
DROP TABLE `student`;

-- CreateTable
CREATE TABLE `AdminAssignment` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `assignmentName` VARCHAR(191) NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentAssignment` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `adminAssignmentId` VARCHAR(191) NOT NULL,
    `assingmenturl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Report_studentassignmentId_key` ON `Report`(`studentassignmentId`);

-- AddForeignKey
ALTER TABLE `StudentAssignment` ADD CONSTRAINT `StudentAssignment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_studentassignmentId_fkey` FOREIGN KEY (`studentassignmentId`) REFERENCES `StudentAssignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
