-- CreateTable
CREATE TABLE "MilitaryInstallationAnomaly" (
    "id" UUID NOT NULL,
    "topic" VARCHAR(255) NOT NULL,
    "securityNodeId" UUID NOT NULL,
    "militaryInstallationId" UUID NOT NULL,

    CONSTRAINT "MilitaryInstallationAnomaly_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MilitaryInstallationAnomaly" ADD CONSTRAINT "MilitaryInstallationAnomaly_securityNodeId_fkey" FOREIGN KEY ("securityNodeId") REFERENCES "SecurityNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilitaryInstallationAnomaly" ADD CONSTRAINT "MilitaryInstallationAnomaly_militaryInstallationId_fkey" FOREIGN KEY ("militaryInstallationId") REFERENCES "MilitaryInstallation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
