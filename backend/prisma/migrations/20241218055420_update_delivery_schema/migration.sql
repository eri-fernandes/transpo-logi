/*
  Warnings:

  - You are about to drop the column `destinationRegion` on the `delivery` table. All the data in the column will be lost.
  - Added the required column `destination` to the `delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "delivery" DROP COLUMN "destinationRegion",
ADD COLUMN     "destination" "Destination" NOT NULL;
