/*
  Warnings:

  - A unique constraint covering the columns `[director_id]` on the table `Grade` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "director_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Grade_director_id_key" ON "Grade"("director_id");

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_director_id_fkey" FOREIGN KEY ("director_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
