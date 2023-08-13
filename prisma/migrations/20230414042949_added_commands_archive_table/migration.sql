-- CreateTable
CREATE TABLE `commandsarchive` (
    `id_command` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(60) NULL,
    `last_name` VARCHAR(60) NULL,
    `phone_number` VARCHAR(10) NOT NULL,
    `email` VARCHAR(70) NULL,
    `ville` VARCHAR(40) NULL,
    `createdAt` DATE NULL DEFAULT (curdate()),
    `status` TINYINT NULL DEFAULT 0,

    PRIMARY KEY (`id_command`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
