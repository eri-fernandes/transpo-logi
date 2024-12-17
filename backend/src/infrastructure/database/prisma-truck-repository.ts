import { Truck } from '../../domain/entities/truck';
import { TruckRepository } from '../../domain/repositories/truck-repository';
import prisma from '../orm/prisma-client';

export class PrismaTruckRepository implements TruckRepository {
  async create(data: { id: string; licensePlate: string }) {
    return prisma.truck.create({ data });
  }
  fincByLicensePlate(licensePlate: string): Promise<Truck | null> {
    return prisma.truck.findUnique({ where: { licensePlate } });
  }
}
