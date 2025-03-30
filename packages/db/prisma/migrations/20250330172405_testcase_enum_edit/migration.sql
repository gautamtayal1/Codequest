/*
  Warnings:

  - The values [COMPILATION_ERROR] on the enum `TestCaseResult` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TestCaseResult_new" AS ENUM ('AC', 'FAIL', 'TLE', 'MLE', 'PENDING', 'COMPILE_ERROR');
ALTER TABLE "TestCase" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "TestCase" ALTER COLUMN "status" TYPE "TestCaseResult_new" USING ("status"::text::"TestCaseResult_new");
ALTER TYPE "TestCaseResult" RENAME TO "TestCaseResult_old";
ALTER TYPE "TestCaseResult_new" RENAME TO "TestCaseResult";
DROP TYPE "TestCaseResult_old";
ALTER TABLE "TestCase" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
