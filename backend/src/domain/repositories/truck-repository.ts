import { Truck } from '../entities/truck';

export interface TruckRepository {
  create(truck: Truck): Promise<Truck>;
  findById(id: string): Promise<Truck | null>;
  findAll(): Promise<Truck[]>;
  update(truck: Truck): Promise<Truck>;
  delete(id: string): Promise<void>;
}
