/*
  Warnings:

  - You are about to drop the column `registeredBy` on the `ShootPractice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShootPractice" DROP CONSTRAINT "ShootPractice_registeredBy_fkey";

-- AlterTable
ALTER TABLE "ShootPractice" DROP COLUMN "registeredBy";
