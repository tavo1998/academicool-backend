/*
  Warnings:

  - Added the required column `delivery_date` to the `Assigment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assigment" ADD COLUMN     "delivery_date" DATE NOT NULL;
