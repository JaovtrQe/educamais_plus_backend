/*
  Warnings:

  - You are about to drop the column `resourceId` on the `Recommendation` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `usageCount` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StepResource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ResourceToTag` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `url` on table `Resource` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `type` on the `Resource` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Recommendation" DROP CONSTRAINT "Recommendation_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_createdById_fkey";

-- DropForeignKey
ALTER TABLE "StepResource" DROP CONSTRAINT "StepResource_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "StepResource" DROP CONSTRAINT "StepResource_stepId_fkey";

-- DropForeignKey
ALTER TABLE "_ResourceToTag" DROP CONSTRAINT "_ResourceToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ResourceToTag" DROP CONSTRAINT "_ResourceToTag_B_fkey";

-- DropIndex
DROP INDEX "Resource_categoryId_idx";

-- DropIndex
DROP INDEX "Resource_createdById_idx";

-- AlterTable
ALTER TABLE "Recommendation" DROP COLUMN "resourceId";

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "categoryId",
DROP COLUMN "createdById",
DROP COLUMN "filePath",
DROP COLUMN "usageCount",
ADD COLUMN     "stepId" TEXT,
ALTER COLUMN "url" SET NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "StepResource";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_ResourceToTag";

-- DropEnum
DROP TYPE "ResourceType";

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE SET NULL ON UPDATE CASCADE;
