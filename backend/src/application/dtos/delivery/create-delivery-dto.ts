import { CargoType, Destination } from '../../../domain/entities/delivery';

export interface CreateDeliveryDTO {
  truckId: string;
  driverId: string;
  type: CargoType;
  value: number;
  destination: Destination;
  date: Date;
  insured?: boolean;
}
