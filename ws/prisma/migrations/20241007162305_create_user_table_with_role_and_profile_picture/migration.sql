/*
  Warnings:

  - Made the column `institution` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `limit` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "institution" SET NOT NULL,
ALTER COLUMN "limit" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL;
