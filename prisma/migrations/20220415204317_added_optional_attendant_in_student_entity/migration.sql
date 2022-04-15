-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_attendant_id_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "attendant_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_attendant_id_fkey" FOREIGN KEY ("attendant_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
