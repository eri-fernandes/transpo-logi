import { Truck } from '../entities/truck';

export interface TruckRepository {
  create(truck: Truck): Promise<Truck>;
  findByLicensePlate(licensePlate: string): Promise<Truck | null>;
  findAll(): Promise<Truck[]>;
  findById(id: string): Promise<Truck | null>;
  update(id: string, truck: Truck): Promise<Truck>;
  delete(id: string): Promise<void>;
}
