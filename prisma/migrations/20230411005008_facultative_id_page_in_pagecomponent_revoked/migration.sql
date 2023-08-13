/*
  Warnings:

  - Made the column `id_page` on table `pagecomponent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `pagecomponent` DROP FOREIGN KEY `pagecomponent_ibfk_1`;

-- AlterTable
ALTER TABLE `pagecomponent` MODIFY `id_page` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `pagecomponent` ADD CONSTRAINT `pagecomponent_ibfk_1` FOREIGN KEY (`id_page`) REFERENCES `page`(`id_page`) ON DELETE NO ACTION ON UPDATE NO ACTION;
