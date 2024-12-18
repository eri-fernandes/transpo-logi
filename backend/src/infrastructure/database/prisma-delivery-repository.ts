import { Destination, CargoType } from '@prisma/client';
import { Delivery } from '../../domain/entities/delivery';
import { DeliveryRepository } from '../../domain/repositories/delivery-repository';
import prisma from '../orm/prisma-client';

export class PrismaDeliveryRepository implements DeliveryRepository {
  // Criação de uma nova entrega
  async create(delivery: Delivery): Promise<any> {
    const createdDelivery = await prisma.delivery.create({
      data: {
        id: delivery.id,
        truckId: delivery.truckId,
        driverId: delivery.driverId,
        type: delivery.type as unknown as CargoType,
        value: delivery.value,
        destination: delivery.destination as unknown as Destination,
        date: delivery.date,
        isValuable: delivery.value > 30000,
        isDangerous: delivery.isDangerous,
      },
    });

    return createdDelivery;
  }

  // Contar entregas por caminhão e mês
  async countByTruckAndMonth(truckId: string, date: Date): Promise<number> {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const count = await prisma.delivery.count({
      where: {
        truckId,
        date: {
          gte: firstDayOfMonth,
          lt: lastDayOfMonth,
        },
      },
    });

    return count;
  }

  // Contar entregas por motorista e mês
  async countByDriverAndMonth(driverId: string, date: Date): Promise<number> {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const count = await prisma.delivery.count({
      where: {
        driverId,
        date: {
          gte: firstDayOfMonth,
          lt: lastDayOfMonth,
        },
      },
    });

    return count;
  }

  // Contar entregas por motorista e região
  async countByDriverAndRegion(
    driverId: string,
    region: Destination
  ): Promise<number> {
    const count = await prisma.delivery.count({
      where: {
        driverId,
        destination: region as Destination,
      },
    });
    return count;
  }

  async findAll(): Promise<any[]> {
    const deliveries = await prisma.delivery.findMany();
    return deliveries;
  }

  async findById(id: string): Promise<any | null> {
    const delivery = await prisma.delivery.findUnique({
      where: { id },
    });

    return delivery;
  }

  async delete(id: string): Promise<void> {
    await prisma.delivery.delete({
      where: { id },
    });
  }
}
