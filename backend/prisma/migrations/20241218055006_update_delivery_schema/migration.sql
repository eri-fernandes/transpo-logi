/*
  Warnings:

  - You are about to drop the column `destination` on the `delivery` table. All the data in the column will be lost.
  - Added the required column `destinationRegion` to the `delivery` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `delivery` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `insured` on table `delivery` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CargoType" AS ENUM ('ELECTRONICS', 'FUEL', 'OTHER');

-- CreateEnum
CREATE TYPE "Destination" AS ENUM ('NORTHEAST', 'ARGENTINA', 'AMAZON', 'OTHER');

-- AlterTable
ALTER TABLE "delivery" DROP COLUMN "destination",
ADD COLUMN     "destinationRegion" "Destination" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "CargoType" NOT NULL,
ALTER COLUMN "insured" SET NOT NULL;
