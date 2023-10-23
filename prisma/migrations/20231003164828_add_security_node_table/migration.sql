-- CreateTable
CREATE TABLE "SecurityNode" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT 'Camara de seguridad inteligente',
    "token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "militaryInstallationId" UUID NOT NULL,

    CONSTRAINT "SecurityNode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SecurityNode_name_key" ON "SecurityNode"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SecurityNode_token_key" ON "SecurityNode"("token");

-- AddForeignKey
ALTER TABLE "SecurityNode" ADD CONSTRAINT "SecurityNode_militaryInstallationId_fkey" FOREIGN KEY ("militaryInstallationId") REFERENCES "MilitaryInstallation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
