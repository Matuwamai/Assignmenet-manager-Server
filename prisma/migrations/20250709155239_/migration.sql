-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('STUDENT', 'ADMIN') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `regNumber` VARCHAR(191) NOT NULL,
    `studyProgram` VARCHAR(191) NOT NULL,
    `yearOfStudy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Student_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assignment` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `assignmentUrl` VARCHAR(191) NOT NULL,
    `isReviewed` BOOLEAN NOT NULL DEFAULT false,
    `marks` INTEGER NULL,
    `status` ENUM('SENT', 'NOT_SENT') NOT NULL DEFAULT 'NOT_SENT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` VARCHAR(191) NOT NULL,
    `assignmentId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Report_assignmentId_key`(`assignmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_assignmentId_fkey` FOREIGN KEY (`assignmentId`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
