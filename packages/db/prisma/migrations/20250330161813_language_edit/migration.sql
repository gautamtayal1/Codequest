/*
  Warnings:

  - You are about to drop the column `langaugeId` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `languageId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "langaugeId",
ADD COLUMN     "languageId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "LangaugeId";

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
