/*
  Warnings:

  - You are about to drop the column `isTrending` on the `Project` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_project_trending";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "isTrending",
ADD COLUMN     "projectTags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE INDEX "idx_project_tags" ON "Project"("projectTags");
