/*
  Warnings:

  - The primary key for the `Assistance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `student_id` on the `Assistance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,subject_id]` on the table `Assistance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Assistance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assistance" DROP CONSTRAINT "Assistance_student_id_fkey";

-- AlterTable
ALTER TABLE "Assistance" DROP CONSTRAINT "Assistance_pkey",
DROP COLUMN "student_id",
ADD COLUMN     "description" VARCHAR(280) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "date" SET DATA TYPE DATE,
ADD CONSTRAINT "Assistance_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "StudentAssistance" (
    "student_id" INTEGER NOT NULL,
    "assistance_id" INTEGER NOT NULL,
    "attended" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAssistance_pkey" PRIMARY KEY ("student_id","assistance_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assistance_date_subject_id_key" ON "Assistance"("date", "subject_id");

-- AddForeignKey
ALTER TABLE "StudentAssistance" ADD CONSTRAINT "StudentAssistance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAssistance" ADD CONSTRAINT "StudentAssistance_assistance_id_fkey" FOREIGN KEY ("assistance_id") REFERENCES "Assistance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
