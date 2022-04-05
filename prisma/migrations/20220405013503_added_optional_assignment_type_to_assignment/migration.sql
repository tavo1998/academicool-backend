-- DropForeignKey
ALTER TABLE "Assigment" DROP CONSTRAINT "Assigment_assigment_type_id_fkey";

-- AlterTable
ALTER TABLE "Assigment" ALTER COLUMN "assigment_type_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Assigment" ADD CONSTRAINT "Assigment_assigment_type_id_fkey" FOREIGN KEY ("assigment_type_id") REFERENCES "AssigmentType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
