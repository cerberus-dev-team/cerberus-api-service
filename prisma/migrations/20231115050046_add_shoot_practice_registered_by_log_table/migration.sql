/*
  Warnings:

  - Added the required column `registeredBy` to the `ShootPractice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShootPractice" ADD COLUMN     "registeredBy" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ShootPractice" ADD CONSTRAINT "ShootPractice_registeredBy_fkey" FOREIGN KEY ("registeredBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
