import { Delivery } from '../entities/delivery';

export interface DeliveryRepository {
  create(delivery: Delivery): Promise<Delivery>;
  countByTruckAndMonth(truckId: string, month: number): Promise<number>;
  countByDriverAndMonth(driverId: string, month: number): Promise<number>;
  countByDriverAndRegion(driverId: string, region: string): Promise<number>;
  findAll(): Promise<Delivery[]>;
  findById(id: string): Promise<Delivery | null>;
  delete(id: string): Promise<void>;
}
