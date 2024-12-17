// src/infrastructure/repositories/InMemoryTruckRepository.ts

import { Truck } from '../../domain/entities/truck';
import { TruckRepository } from '../../domain/repositories/truck-repository';

export class InMemoryTruckRepository implements TruckRepository {
  private trucks: Truck[] = [];

  async create(truck: Truck): Promise<Truck> {
    this.trucks.push(truck);
    return truck;
  }

  async fincByLicensePlate(licensePlate: string): Promise<Truck | null> {
    return (
      this.trucks.find((truck) => truck.licensePlate === licensePlate) || null
    );
  }
}
