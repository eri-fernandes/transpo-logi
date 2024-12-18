import { Truck } from '../../../domain/entities/truck';

export interface DriverResponseDTO {
  id?: string;
  name: string;
  licenseNumber: string;
  truck?: Truck;
}
