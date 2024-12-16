import { Driver } from '../../../domain/entities/driver';

export interface TruckResponseDTO {
  id: string;
  licensePlate: string;
  driver?: Driver;
  deliveries?: string[];
}
