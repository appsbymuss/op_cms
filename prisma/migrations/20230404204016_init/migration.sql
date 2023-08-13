-- CreateTable
CREATE TABLE `location` (
    `id_location` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(50) NULL,
    `id_page` INTEGER NOT NULL,

    UNIQUE INDEX `id_page`(`id_page`),
    PRIMARY KEY (`id_location`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `page` (
    `id_page` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(50) NOT NULL,
    `createdAt` DATE NULL DEFAULT (curdate()),
    `template_file` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `slug`(`slug`),
    PRIMARY KEY (`id_page`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `pagecomponent` (
    `id_component` INTEGER NOT NULL AUTO_INCREMENT,
    `id_page` INTEGER NULL,
    `type` VARCHAR(30) NULL,
    `title` VARCHAR(50) NULL,
    `content` VARCHAR(500) NULL,

    INDEX `id_page`(`id_page`),
    PRIMARY KEY (`id_component`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `pageimage` (
    `id_image` INT NOT NULL AUTO_INCREMENT,
    `id_component` INTEGER NOT NULL,
    `image_path` VARCHAR(50) NULL,

    INDEX `id_component`(`id_component`),
    PRIMARY KEY (`id_image`, `id_component`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`id_page`) REFERENCES `page`(`id_page`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pagecomponent` ADD CONSTRAINT `pagecomponent_ibfk_1` FOREIGN KEY (`id_page`) REFERENCES `page`(`id_page`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pageimage` ADD CONSTRAINT `pageimage_ibfk_1` FOREIGN KEY (`id_component`) REFERENCES `pagecomponent`(`id_component`) ON DELETE NO ACTION ON UPDATE NO ACTION;