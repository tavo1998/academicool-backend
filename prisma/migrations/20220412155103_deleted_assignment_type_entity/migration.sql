/*
  Warnings:

  - You are about to drop the column `assigment_type_id` on the `Assigment` table. All the data in the column will be lost.
  - You are about to drop the `AssigmentType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assigment" DROP CONSTRAINT "Assigment_assigment_type_id_fkey";

-- AlterTable
ALTER TABLE "Assigment" DROP COLUMN "assigment_type_id";

-- DropTable
DROP TABLE "AssigmentType";
