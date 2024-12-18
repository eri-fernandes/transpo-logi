import { Driver } from '../entities/driver';

export interface DriverRepository {
  create(driver: Driver): Promise<Driver>;
  findByLicenseNumber(licenseNumber: string): Promise<Driver | null>;
  findAll(): Promise<Driver[]>;
  findById(id: string): Promise<Driver | null>;
  update(id: string, driver: Driver): Promise<Driver>;
  delete(id: string): Promise<void>;
}
