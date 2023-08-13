-- CreateTable
CREATE TABLE `admin` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NULL,
    `password` VARCHAR(30) NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `websiteparams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logo_path` VARCHAR(50) NOT NULL,
    `website_title` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `email` VARCHAR(60) NULL,
    `primary_color` VARCHAR(12) NULL,
    `secondary_color` VARCHAR(12) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
