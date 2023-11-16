-- AlterTable
ALTER TABLE "MilitaryInstallation" ADD COLUMN     "shootPracticeId" UUID;

-- AlterTable
ALTER TABLE "MilitaryPerson" ADD COLUMN     "shootPracticeId" UUID;

-- CreateTable
CREATE TABLE "ShootPractice" (
    "id" UUID NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID NOT NULL,

    CONSTRAINT "ShootPractice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MilitaryInstallation" ADD CONSTRAINT "MilitaryInstallation_shootPracticeId_fkey" FOREIGN KEY ("shootPracticeId") REFERENCES "ShootPractice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilitaryPerson" ADD CONSTRAINT "MilitaryPerson_shootPracticeId_fkey" FOREIGN KEY ("shootPracticeId") REFERENCES "ShootPractice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
