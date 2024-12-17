import { Truck } from '../../domain/entities/truck';
import { TruckRepository } from '../../domain/repositories/truck-repository';
import prisma from '../orm/prisma-client';

export class PrismaTruckRepository implements TruckRepository {
  async findByLicensePlate(licensePlate: string): Promise<Truck | null> {
    return prisma.truck.findUnique({ where: { licensePlate } });
  }

  async findAll(): Promise<Truck[]> {
    return prisma.truck.findMany();
  }

  async findById(id: string): Promise<Truck | null> {
    return prisma.truck.findUnique({ where: { id } });
  }

  async update(id: string, truck: Truck): Promise<Truck> {
    return prisma.truck.update({
      where: { id },
      data: {
        licensePlate: truck.licensePlate,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.truck.delete({ where: { id } });
  }

  async create(data: { id: string; licensePlate: string }): Promise<Truck> {
    return prisma.truck.create({ data });
  }
}
