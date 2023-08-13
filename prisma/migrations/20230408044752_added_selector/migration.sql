/*
  Warnings:

  - You are about to drop the column `type` on the `pagecomponent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_page,classSelector]` on the table `pagecomponent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classSelector` to the `pagecomponent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pagecomponent` DROP COLUMN `type`,
    ADD COLUMN `classSelector` VARCHAR(30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pagecomponent_id_page_classSelector_key` ON `pagecomponent`(`id_page`, `classSelector`);