/*
  Warnings:

  - Changed the type of `langaugeId` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LangaugeId" AS ENUM ('js', 'cpp');

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "langaugeId",
ADD COLUMN     "langaugeId" "LangaugeId" NOT NULL;
