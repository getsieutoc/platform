/*
  Warnings:

  - You are about to drop the column `font` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `imageBlurhash` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `message404` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Site" DROP COLUMN "font",
DROP COLUMN "image",
DROP COLUMN "imageBlurhash",
DROP COLUMN "logo",
DROP COLUMN "message404";

-- DropTable
DROP TABLE "Example";
