import { Driver } from '../../domain/entities/driver';
import { DriverRepository } from '../../domain/repositories/driver-repository';
import prisma from '../orm/prisma-client';

export class PrismaDriverRepository implements DriverRepository {
  async findByLicenseNumber(licenseNumber: string): Promise<Driver | null> {
    return prisma.driver.findUnique({ where: { licenseNumber } });
  }

  async findAll(): Promise<Driver[]> {
    return prisma.driver.findMany();
  }

  async findById(id: string): Promise<Driver | null> {
    return prisma.driver.findUnique({ where: { id } });
  }

  async update(id: string, driver: Driver): Promise<Driver> {
    return prisma.driver.update({
      where: { id },
      data: {
        name: driver.name,
        licenseNumber: driver.licenseNumber,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.driver.delete({ where: { id } });
  }

  async create(driver: Driver): Promise<Driver> {
    return prisma.driver.create({
      data: {
        name: driver.name,
        licenseNumber: driver.licenseNumber,
      },
    });
  }
}
