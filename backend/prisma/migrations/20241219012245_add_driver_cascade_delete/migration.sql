-- DropForeignKey
ALTER TABLE "delivery" DROP CONSTRAINT "delivery_driverId_fkey";

-- DropForeignKey
ALTER TABLE "delivery" DROP CONSTRAINT "delivery_truckId_fkey";

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;
