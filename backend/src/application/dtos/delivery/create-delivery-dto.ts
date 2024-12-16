import { CargoType, Destination } from '../../../domain/entities/delivery';
import { Driver } from '../../../domain/entities/driver';
import { Truck } from '../../../domain/entities/truck';

export interface CreateDeliveryDTO {
  id: string;
  truck: Truck;
  driver: Driver;
  type: CargoType;
  value: number;
  destination: Destination;
  date: Date;
  insured?: boolean;
}