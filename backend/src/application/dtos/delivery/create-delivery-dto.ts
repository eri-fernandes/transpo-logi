import { CargoType, Destination } from '../../../domain/entities/delivery';
import { Driver } from '../../../domain/entities/driver';

export interface CreateDeliveryDTO {
  id: string;
  truckId: string;
  driver: Driver;
  type: CargoType;
  value: number;
  destination: Destination;
  date: Date;
  insured?: boolean;
}
