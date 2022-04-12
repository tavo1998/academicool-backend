/*
  Warnings:

  - Added the required column `assignment_type` to the `Assigment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AssignmentType" AS ENUM ('EXAM', 'HOMEWORK', 'WORKSHOP', 'LECTURE', 'PARTICIPATION');

-- AlterTable
ALTER TABLE "Assigment" ADD COLUMN     "assignment_type" "AssignmentType" NOT NULL;
