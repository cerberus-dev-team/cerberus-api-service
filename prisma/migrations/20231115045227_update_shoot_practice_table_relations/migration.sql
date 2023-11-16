/*
  Warnings:

  - You are about to drop the column `shootPracticeId` on the `MilitaryInstallation` table. All the data in the column will be lost.
  - You are about to drop the column `shootPracticeId` on the `MilitaryPerson` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `ShootPractice` table. All the data in the column will be lost.
  - Added the required column `installationId` to the `ShootPractice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `militaryPersonId` to the `ShootPractice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MilitaryInstallation" DROP CONSTRAINT "MilitaryInstallation_shootPracticeId_fkey";

-- DropForeignKey
ALTER TABLE "MilitaryPerson" DROP CONSTRAINT "MilitaryPerson_shootPracticeId_fkey";

-- AlterTable
ALTER TABLE "MilitaryInstallation" DROP COLUMN "shootPracticeId";

-- AlterTable
ALTER TABLE "MilitaryPerson" DROP COLUMN "shootPracticeId";

-- AlterTable
ALTER TABLE "ShootPractice" DROP COLUMN "created_by",
ADD COLUMN     "installationId" UUID NOT NULL,
ADD COLUMN     "militaryPersonId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ShootPractice" ADD CONSTRAINT "ShootPractice_installationId_fkey" FOREIGN KEY ("installationId") REFERENCES "MilitaryInstallation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShootPractice" ADD CONSTRAINT "ShootPractice_militaryPersonId_fkey" FOREIGN KEY ("militaryPersonId") REFERENCES "MilitaryPerson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
