import { CargoType, Destination } from '../../../domain/entities/delivery';
import { Driver } from '../../../domain/entities/driver';
import { Truck } from '../../../domain/entities/truck';

export interface DeliveryResponseDTO {
  id: string;
  type: CargoType;
  value: number;
  destination: Destination;
  date: Date;
  insured?: boolean;
  isValuable: boolean;
  isDangerous: boolean;
  truckId?: string;
  truck?: Truck;
  driverId?: string;
  driver?: Driver;
}
