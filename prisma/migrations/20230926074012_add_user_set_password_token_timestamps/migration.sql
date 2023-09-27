/*
  Warnings:

  - You are about to drop the `UserSetPassword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserSetPassword" DROP CONSTRAINT "UserSetPassword_user_id_fkey";

-- DropTable
DROP TABLE "UserSetPassword";

-- CreateTable
CREATE TABLE "UserSetPasswordToken" (
    "id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "avaible" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "UserSetPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSetPasswordToken_token_key" ON "UserSetPasswordToken"("token");

-- AddForeignKey
ALTER TABLE "UserSetPasswordToken" ADD CONSTRAINT "UserSetPasswordToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
