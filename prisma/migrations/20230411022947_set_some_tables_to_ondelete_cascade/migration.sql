-- DropForeignKey
ALTER TABLE `location` DROP FOREIGN KEY `location_ibfk_1`;

-- DropForeignKey
ALTER TABLE `pagecomponent` DROP FOREIGN KEY `pagecomponent_ibfk_1`;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`id_page`) REFERENCES `page`(`id_page`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pagecomponent` ADD CONSTRAINT `pagecomponent_ibfk_1` FOREIGN KEY (`id_page`) REFERENCES `page`(`id_page`) ON DELETE CASCADE ON UPDATE NO ACTION;
