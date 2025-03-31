/*
  Warnings:

  - You are about to drop the column `contestProblemId` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the `Contest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContestParticipation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContestProblem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContestToSubmission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContestParticipation" DROP CONSTRAINT "ContestParticipation_contestId_fkey";

-- DropForeignKey
ALTER TABLE "ContestParticipation" DROP CONSTRAINT "ContestParticipation_userId_fkey";

-- DropForeignKey
ALTER TABLE "ContestProblem" DROP CONSTRAINT "ContestProblem_contestId_fkey";

-- DropForeignKey
ALTER TABLE "ContestProblem" DROP CONSTRAINT "ContestProblem_problemId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_contestProblemId_fkey";

-- DropForeignKey
ALTER TABLE "_ContestToSubmission" DROP CONSTRAINT "_ContestToSubmission_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContestToSubmission" DROP CONSTRAINT "_ContestToSubmission_B_fkey";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "contestProblemId";

-- DropTable
DROP TABLE "Contest";

-- DropTable
DROP TABLE "ContestParticipation";

-- DropTable
DROP TABLE "ContestProblem";

-- DropTable
DROP TABLE "_ContestToSubmission";

-- DropEnum
DROP TYPE "ContestVisibility";
