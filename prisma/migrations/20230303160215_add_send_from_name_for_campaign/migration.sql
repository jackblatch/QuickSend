/*
  Warnings:

  - Added the required column `sendFromName` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "sendFromName" TEXT NOT NULL;
