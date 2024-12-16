import { CargoType, Destination } from '../../../domain/entities/delivery';
import { Driver } from '../../../domain/entities/driver';

export interface TruckResponseDTO {
  id: string;
  licensePlate: string;
  driver?: Driver;
  deliveries?: {
    id: string;
    type: CargoType;
    value: number;
    destination: Destination;
    date: Date;
    insured?: boolean;
  }[];
}
