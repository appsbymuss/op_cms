/*
  Warnings:

  - Added the required column `specification` to the `commandsarchive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `commandsarchive` ADD COLUMN `specification` VARCHAR(500) NOT NULL;
