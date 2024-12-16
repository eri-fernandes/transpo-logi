// src/infrastructure/repositories/InMemoryTruckRepository.ts

import { Truck } from '../../../domain/entities/truck';
import { TruckRepository } from '../../../domain/repositories/truck-repository';

export class InMemoryTruckRepository implements TruckRepository {
  private trucks: Truck[] = [];

  async create(truck: Truck): Promise<Truck> {
    this.trucks.push(truck);
    return truck;
  }

  async findById(id: string): Promise<Truck | null> {
    return this.trucks.find((truck) => truck.id === id) || null;
  }

  async findAll(): Promise<Truck[]> {
    return this.trucks;
  }

  async update(truck: Truck): Promise<Truck> {
    const index = this.trucks.findIndex((t) => t.id === truck.id);
    if (index === -1) {
      throw new Error('Truck not found');
    }
    this.trucks[index] = truck;
    return truck;
  }

  async delete(id: string): Promise<void> {
    this.trucks = this.trucks.filter((truck) => truck.id !== id);
  }
}
