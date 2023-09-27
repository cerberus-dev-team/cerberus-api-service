/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `MilitaryPerson` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `MilitaryPerson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MilitaryPerson" ADD COLUMN     "phoneNumber" VARCHAR(16) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MilitaryPerson_phoneNumber_key" ON "MilitaryPerson"("phoneNumber");
