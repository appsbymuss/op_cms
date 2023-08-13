/*
  Warnings:

  - Added the required column `sexe` to the `commandsarchive` table without a default value. This is not possible if the table is not empty.
  - Made the column `first_name` on table `commandsarchive` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `commandsarchive` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ville` on table `commandsarchive` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `commandsarchive` ADD COLUMN `interventionDate` DATE NULL,
    ADD COLUMN `sexe` CHAR(1) NOT NULL,
    MODIFY `first_name` VARCHAR(60) NOT NULL,
    MODIFY `last_name` VARCHAR(60) NOT NULL,
    MODIFY `ville` VARCHAR(40) NOT NULL;
