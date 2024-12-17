// src/infrastructure/repositories/InMemoryTruckRepository.ts

import { Truck } from '../../domain/entities/truck';
import { TruckRepository } from '../../domain/repositories/truck-repository';

export class InMemoryTruckRepository implements TruckRepository {
  private trucks: Truck[] = [];

  async findByLicensePlate(licensePlate: string): Promise<Truck | null> {
    const truck = this.trucks.find((t) => t.licensePlate === licensePlate);
    return truck || null;
  }

  async findAll(): Promise<Truck[]> {
    return [...this.trucks];
  }

  async findById(id: string): Promise<Truck | null> {
    const truck = this.trucks.find((t) => t.id === id);
    return truck || null;
  }

  async update(id: string, updatedTruck: Truck): Promise<Truck> {
    const index = this.trucks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error('Truck not found');
    }

    this.trucks[index] = updatedTruck;
    return updatedTruck;
  }

  async delete(id: string): Promise<void> {
    const index = this.trucks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.trucks.splice(index, 1);
    }
  }

  async create(data: { id: string; licensePlate: string }): Promise<Truck> {
    const truck = { ...data };
    this.trucks.push(truck);
    return truck;
  }
}
