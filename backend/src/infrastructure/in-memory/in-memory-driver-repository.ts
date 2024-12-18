// src/infrastructure/repositories/InMemoryTruckRepository.ts

import { Driver } from '../../domain/entities/driver';
import { DriverRepository } from '../../domain/repositories/driver-repository';

export class InMemoryDriverRepository implements DriverRepository {
  private drivers: Driver[] = [];

  async create(driver: Driver): Promise<Driver> {
    this.drivers.push(driver);
    return driver;
  }

  async findByLicenseNumber(licenseNumber: string): Promise<Driver | null> {
    return (
      this.drivers.find((driver) => driver.licenseNumber === licenseNumber) ||
      null
    );
  }

  async findAll(): Promise<Driver[]> {
    return this.drivers;
  }

  async findById(id: string): Promise<Driver | null> {
    return this.drivers.find((driver) => driver.id === id) || null;
  }

  async update(id: string, updatedDriver: Driver): Promise<Driver> {
    const index = this.drivers.findIndex((driver) => driver.id === id);
    if (index === -1) {
      throw new Error('Driver not found');
    }
    this.drivers[index] = { ...this.drivers[index], ...updatedDriver };
    return this.drivers[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.drivers.findIndex((driver) => driver.id === id);
    if (index === -1) {
      throw new Error('Driver not found');
    }
    this.drivers.splice(index, 1);
  }
}
