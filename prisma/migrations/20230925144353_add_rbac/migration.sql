-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'STAFF', 'USER');

-- CreateTable
CREATE TABLE "BloodType" (
    "id" UUID NOT NULL,
    "type" VARCHAR(8) NOT NULL,

    CONSTRAINT "BloodType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "name" VARCHAR(48) NOT NULL,
    "id" SERIAL NOT NULL,
    "departamentId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "name" VARCHAR(48) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departament" (
    "name" VARCHAR(64) NOT NULL,
    "id" SERIAL NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilitaryForce" (
    "id" UUID NOT NULL,
    "name" VARCHAR(48) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "MilitaryForce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilitaryGrade" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "abbreviation" VARCHAR(8) NOT NULL,
    "militaryRankId" UUID NOT NULL,

    CONSTRAINT "MilitaryGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilitaryInstallation" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "miltaryForceId" UUID NOT NULL,

    CONSTRAINT "MilitaryInstallation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilitaryPerson" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "gradeId" UUID,
    "installationId" UUID,
    "bloodTypeId" UUID,

    CONSTRAINT "MilitaryPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilitaryRank" (
    "id" UUID NOT NULL,
    "name" VARCHAR(48) NOT NULL,
    "image_url" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "miltaryForceId" UUID NOT NULL,

    CONSTRAINT "MilitaryRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourcesOnRoles" (
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "CAN_CREATE" BOOLEAN NOT NULL DEFAULT false,
    "CAN_READ" BOOLEAN NOT NULL DEFAULT false,
    "CAN_UPDATE" BOOLEAN NOT NULL DEFAULT false,
    "CAN_DELETE" BOOLEAN NOT NULL DEFAULT false,
    "roleId" UUID NOT NULL,
    "resourceId" UUID NOT NULL,
    "id" UUID NOT NULL,

    CONSTRAINT "ResourcesOnRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL,
    "name" "RoleType" NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(48) NOT NULL,
    "last_name" VARCHAR(40) NOT NULL,
    "email" TEXT NOT NULL,
    "image_url" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "last_login" TIMESTAMP(6),
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "roleId" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSetPassword" (
    "id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "avaible" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "UserSetPassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BloodType_type_key" ON "BloodType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Departament_name_key" ON "Departament"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MilitaryForce_name_key" ON "MilitaryForce"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MilitaryGrade_name_key" ON "MilitaryGrade"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MilitaryPerson_userId_key" ON "MilitaryPerson"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSetPassword_token_key" ON "UserSetPassword"("token");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "Departament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departament" ADD CONSTRAINT "Departament_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilitaryForce" ADD CONSTRAINT "MilitaryForce_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilitaryGrade" ADD CONSTRAINT "MilitaryGrade_militaryRankId_fkey" FOREIGN KEY ("militaryRankId") REFERENCES "MilitaryRank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilitaryInstallation" ADD CONSTRAINT "MilitaryInstallation_miltaryForceId_fkey" FOREIGN KEY ("miltaryForceId") REFERENCES "MilitaryForce"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilitaryPerson" ADD CONSTRAINT "MilitaryPerson_bloodTypeId_fkey" FOREIGN KEY ("bloodTypeId") REFERENCES "BloodType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilitaryPerson" ADD CONSTRAINT "MilitaryPerson_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "MilitaryGrade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilitaryPerson" ADD CONSTRAINT "MilitaryPerson_installationId_fkey" FOREIGN KEY ("installationId") REFERENCES "MilitaryInstallation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilitaryPerson" ADD CONSTRAINT "MilitaryPerson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilitaryRank" ADD CONSTRAINT "MilitaryRank_miltaryForceId_fkey" FOREIGN KEY ("miltaryForceId") REFERENCES "MilitaryForce"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesOnRoles" ADD CONSTRAINT "ResourcesOnRoles_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesOnRoles" ADD CONSTRAINT "ResourcesOnRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSetPassword" ADD CONSTRAINT "UserSetPassword_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
